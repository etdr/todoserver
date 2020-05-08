
module.exports = (seq, DataTypes) =>
  seq.define('todo', {
    description: DataTypes.STRING,
    completed: DataTypes.ENUM('u','i','c'),
    parentitem: DataTypes.INTEGER,
    ord: DataTypes.INTEGER,
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    priority: {
      type: DataTypes.INTEGER,
      validation: {
        max: 10,
        min: 0
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
