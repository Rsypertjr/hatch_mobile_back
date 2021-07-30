'use strict';
module.exports =  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      /*
      publisherId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        privateKey:true
      },
      installId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        privateKey: true
      },
      */
      campaignName: {
        allowNull: false, 
        type: Sequelize.STRING
      },
      campaignIconUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      payPerInstall: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    },
    {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["campaignIconUrl","campaignName"]
        },
      }
    }
    
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Campaigns');
  }
};