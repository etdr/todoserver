
let router = require('express').Router();

let UserInfoModel = require('../db').import('../models/userinfo');





router.post('/init', (req, res) => {
  let ui = req.body.userinfo;
  const userid = req.user.id;

  if (!ui.birthdate) ui.birthdate = null;
  if (!ui.about) ui.about = null;
  if (!ui.zip) ui.zip = null;
  if (!ui.country) ui.country = null;

  UserInfoModel.create({
    birthdate: ui.birthdate,
    about: ui.about,
    zip: ui.zip,
    country: ui.country,
    userId: userid
  }).then(data => res.send(data))
    .catch(error => res.send(error.message));
});


router.get('/', (req, res) => {
  const userid = req.user.id;

  UserInfoModel.findOne({
    where: { userId: userid }
    //include: 'user'
  }).then( data => {
    res.status(200).json({
      message: "user info contained herein",
      data: data
    });
  }).catch(error => res.status(500).json('userinfo not found', error));
});


router.put('/', (req, res) => {
  const userid = req.user.id;

  let birthdate = req.body.userinfo.birthdate;
  let about = req.body.userinfo.about;
  let zip = req.body.userinfo.zip;
  let country = req.body.userinfo.country;

  UserInfoModel.findOne({
    where: { userId: userid }
  }).then( data => {
    if (!birthdate) birthdate = data.birthdate;
    if (!about) about = data.about;
    if (!zip) zip = data.zip;
    if (!country) country = data.country;

    return UserInfoModel.update({
      birthdate: birthdate,
      about: about,
      zip: zip,
      country: country
    }, {
      where: { userId: userid }
    });
			      		       
  }).then( response => {
    res.json(response);
  }, error => {
    res.status(500).send(error.message);
  });
});


router.delete('/userinfo/birthdate', (req, res) => {
  const userid = req.user.id;

  UserInfoModel.update({
    birthdate: null
  }, {
    where: { userId: userId }
  }).then( data => res.send('data'),
	   error => res.status(500).send(error.message));
});

router.delete('/userinfo/about', (req,res) => {
  const userid = req.user.id;

  UserInfoModel.update({
    about: null
  }, {
    where: { userId: userId }
  }).then( data => res.send('data'),
	   error => res.status(500).send(error.message));
});

router.delete('/userinfo/zip', (req, res) => {
  const userid = req.user.id;

  UserInfoModel.update({
    zip: null
  }, {
    where: { userId: userId }
  }).then( data => res.send('data'),
	   error => res.status(500).send(error.message));
});

router.delete('/userinfo/country', (req, res) => {
  const userid = req.user.id;

  UserInfoModel.update({
    country: null
  }, {
    where: { userId: userId }
  }).then( data => res.send('data'),
	   error => res.status(500).send(error.message));
});

















module.exports = router;



















