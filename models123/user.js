
const User=(sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    Name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull : false
    },
    UserId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
  }, {
      timestamps: false
  });
  return User;
};

module.exports = User