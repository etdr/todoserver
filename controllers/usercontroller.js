
const express = require('express');
let router = express.Router();

let seq = require('../db');
let User = seq.import('../models/user');

const jwt = require('jsonwebtoken');
const bc = require('bcryptjs');


router.post('/newuser', (req, res) => {
  let username = req.body.user.username;
  let pass = req.body.user.password;

  User.create({
    username: username,
    pw: bc.hashSync(pass, 14)
  }).then((user) => {
    let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24*7});
    res.json({
      user: user,
      message: 'created user',
      sessionToken: token});
  }, (err) => res.status(500).send(err.message));

});


router.post('/signin', (req, res) => {
  User.findOne({ where: {username: req.body.user.username} })
    .then(function (user) {
      if (user) {
        bc.compare(req.body.user.password, user.pw, function (err, matches) {
          if (matches) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24*7});
            res.json({
              user: user,
              message: 'authenticated',
              sessionToken: token
            });
          } else {
            res.status(502).send({error: "502 error"});
          }
        });
      } else {
	      res.status(500).send({error: "500 failure to authenticate"});
      }
    }, error => res.status(501).send({error: "501 error"}));
});






module.exports = router;
