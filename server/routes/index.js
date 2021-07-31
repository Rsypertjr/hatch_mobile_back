const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const campaignsController = require('../controllers').campaigns;
const mediaItemsController = require('../controllers').mediaItems;


const axios = require('axios').default;
const Campaign = require('../models').Campaign;
const MediaItem = require('../models').MediaItem;


const express = require('express');
const { response } = require('express')
const router = express.Router();


console.log("Gets to Routes");
module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: "Welcome to the Todos API!",
    }));

    app.post('/api/todos', todosController.create);
    app.get('/api/todos', todosController.list);
    app.post('/api/todos/:todoId/items',todoItemsController.create);
    app.get('/api/todos/:todoId', todosController.retrieve);
    app.put('/api/todos/:todoId', todosController.update);
    app.delete('/api/todos/:todoId', todosController.destroy);

    app.post('/api/todos/:todoId/items', todoItemsController.create);
    app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
    app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);   

    app.post('/api/campaigns', campaignsController.create)
    app.get('/api/campaigns', campaignsController.list)
    app.post('/api/campaigns/:campaignId/mediaItems',mediaItemsController.create);

    app.get('/load', async (req, res, next) => {
          const response = await axios.get("https://www.plugco.in/public/take_home_sample_feed");
        
           // Write Campaigns to database
            response.data.campaigns.map(c => {   
                Campaign.findOrCreate({
                    where:{
                        campaignName:  c.campaign_name,
                        campaignIconUrl:  c.campaign_icon_url,
                        payPerInstall: parseFloat(c.pay_per_install)                        
                       // installId: 0,
                     //   publisherId: 0

                    },
                   defaults: { // set the default properties if it doesn't exist
                    }
                        
                    }).then(result => {
                       var campaign = result[0];
                       var created = result[1];
                        
                       if (!created) { // false if author already exists and was not created.
                           console.log('Campaign already exists');

                    }
                    else{                           
                        console.log('Campaign Created!');
                      }
                    }).catch(error => console.log(error)); 



            });
        response.data.campaigns.map(campaign => {

            campaign.medias.map(m => {
                console.log(m);
                MediaItem.create({
                           
                    campaignId: parseInt(campaign.id), 
                    coverPhotoUrl:  m.cover_photo_url,
                    downloadUrl:  m.download_url,
                    trackingLink: m.tracking_link,
                    mediaType: m.media_type,
                }) 
                .then(mitem => console.log('Media Item Saved!'))
                .catch(error => console.log(error));    
            });

        });
        res.send(response.data);   
        
      });
      
    // For any other request method on todo items, we're going to return "Method Not Allowed"
    app.all('/api/todos/:todoId/items', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
    }));
};