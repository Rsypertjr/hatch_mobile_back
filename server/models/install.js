module.exports = (sequelize, DataTypes) => {
  const Install = sequelize.define('Install',{
    platform: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    }, 
  });
/*
  Install.associate = (models) => {
    Install.hasMany(models.Campaign,{
      foreignKey: 'installId',
      as: 'campaigns'
    });
  };
  */

  return Install;
}