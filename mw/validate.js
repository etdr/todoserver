
const jwt = require('jsonwebtoken');
let seq = require('../db');
let User = seq.import('../models/user');

function f (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  } else {
    let sessionToken = req.headers.authorization;
    if (!sessionToken) return res.status(403).send({auth: false, message: 'no token provided'});
    else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
				if (decoded) {
	  			User.findOne({ where: { id: decoded.id } })
	    			.then(user => {
	      			req.user = user;
	      			next();
	    			}, () => {
	      			res.status(401).send({error: 'you are not authorized 1'});
	    			});
				} else {
	  			res.status(400).send({error: 'you are not authorized 2'});
				}
      });
    }
  }
}


module.exports = f;
