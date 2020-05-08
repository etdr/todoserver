
module.exports = (seq, DataTypes) => seq.define('user', {
  username: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    },
    unique: true
  },
  pw: DataTypes.STRING
});
