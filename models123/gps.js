
const Gps=(sequelize, DataTypes) => {
  const Gps=sequelize.define("Gps", {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    DeviceId: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      DeviceType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Timestamp: {
        type: DataTypes.DATE,
      allowNull: false,
      },
    Location: {
        type: DataTypes.STRING,
        allowNull : false
    }
  }, {
      timestamps: false
  });
  return Gps;
};

module.exports = Gps