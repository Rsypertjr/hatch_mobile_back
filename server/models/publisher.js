module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher',{
    publisherName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    /*
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    */
    removeAt: {
      type: DataTypes.DATE,
      defaultValue: false,
    },
  });

  /*
  Publisher.associate = (models) => {
    Publisher.hasMany(models.Campaign,{
      foreignKey: 'publisherId',
      as: 'campaigns'
    });
  };
  */

  return Publisher;
}