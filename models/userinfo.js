
module.exports = (seq, DT) => {
  return seq.define('userinfo', {
    birthdate: {
      type: DT.DATEONLY,
      allowNull: true
    },
    about: {
      type: DT.TEXT,
      allowNull: true
    },
    zip: {
      type: DT.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]{5}$/
        //len: [5,5]
      }
    },
    country: {
      type: DT.STRING,
      allowNull: true
    },
    userId: {
      type: DT.INTEGER,
      allowNull: false,
      unique: true
    }
  });
};
