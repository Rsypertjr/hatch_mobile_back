'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MediaItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      campaignId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Campaigns',
          key: 'id',
          as: 'campaignId',
        },
      },
      coverPhotoUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      downloadUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trackingLink: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mediaType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["campaignId","coverPhotoUrl","downloadUrl"]
        },
      }
    }
    
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MediaItems');
  }
};