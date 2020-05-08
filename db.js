
const Seq = require('sequelize');

const seq = new Seq('todolog', 'winfield', '', {
  host: 'localhost',
  dialect: 'postgres'
});



// seq.authenticate().then(() => console.log('connected to postgres'))
//   .catch(() => console.log('error connecting to postgres'));

const f = async () => {
  try {
    let seqauth = await seq.authenticate();
    console.log(seqauth);
    console.log('success with postgres');
  } catch (err) {
    console.log('error with postgres');
  }
}
f();


let User = seq.import('./models/user');
let UserInfo = seq.import('./models/userinfo');
let Todo = seq.import('./models/todo');

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Todo);
Todo.belongsTo(User);


module.exports = seq;
