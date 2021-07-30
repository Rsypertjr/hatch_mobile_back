const Campaign = require('../models').Campaign;
const MediaItem = require('../models').MediaItem;

module.exports = {
    create(req, res){
        
        return Campaign
        .findOrCreate({
            where:{
                campaignName:  c.campaign_name,
                campaignIconUrl:  c.campaign_icon_url,
                payPerInstall: parseFloat(c.pay_per_install),                        
                installId: 0,
                publisherId: 0

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
    },
    list(req, res){
        return Campaign 
            .findAll({
                include:[{
                    model: MediaItem,
                    as: 'mediaItems',
                }],
            })
            .then(camps => res.status(200).send(camps))
            .catch(error => res.status(400).send(error));
    },
};