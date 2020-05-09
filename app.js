
require('dotenv').config();

const express = require('express');
let app = express();

let todoC = require('./controllers/todocontroller');
let userC = require('./controllers/usercontroller');
let userinfoC = require('./controllers/userinfocontroller');
//let loginC = require('./controllers/logincontroller');

let seq = require('./db');


seq.sync();

app.use(express.json());

app.use(require('./mw/headers'));

app.use('/user', userC);

app.use(require('./mw/validate'));

app.use('/todo', todoC);
app.use('/userinfo', userinfoC);



app.listen(3012, () => console.log('listening on 3012'));





