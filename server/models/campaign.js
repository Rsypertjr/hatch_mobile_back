module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    /*
    installId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    */
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campaignIconUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payPerInstall: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
  },
  {
    indexes: [
      {
        unique:true,
        fields:["campaignName","campaignIconUrl"]
      }
    ]
  }

  
  
  
  );

  Campaign.associate = (models) => {
    Campaign.hasMany(models.MediaItem, {
      foreignKey: 'campaignId',
      as: 'mediaItems',
      onDelete: "CASCADE"
    });
  };
/*
  Campaign.associate = (models) => {
      Campaign.hasMany(models.Publisher, {
        foreignKey: 'campaignId',
        as: 'publishers',
      });
    };
*/
   
  return Campaign;
};