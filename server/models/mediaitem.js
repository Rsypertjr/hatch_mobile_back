module.exports = (sequelize, DataTypes) => {
  const MediaItem = sequelize.define('MediaItem', {
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coverPhotoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    downloadUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trackingLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });

  MediaItem.associate = (models) => {
    MediaItem.belongsTo(models.Campaign, {
      foreignKey: 'campaignId', 
      onDelete: 'CASCADE',
    });
  };

  return MediaItem;
};