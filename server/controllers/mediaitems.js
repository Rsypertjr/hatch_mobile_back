const MediaItem = require('../models').MediaItem;

module.exports = {
    create(req, res){
        return MediaItem 
            .create({
                campaignId: req.params.campaignId,
                coverPhotoUrl: req.body.coverPhotoUrl,
                downloadUrl: req.body.downloadUrl,
                coverPhotoUrl: req.body.coverPhotoUrl,
                trackingLink: req.body.trackingLink, 
            })
            .then(mediaItem => res.status(201).send(mediaItem))
            .catch(error => res.status(400).send(error));
    },
};