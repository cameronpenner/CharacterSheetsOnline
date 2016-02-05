Campaign = {
    findAll: function() {
        var result = Collections.Campaigns.find().fetch();
    },
    
    find: function(_id) {
        return Collections.Campaigns.findOne({_id: _id});
    },

    addPlayer: function(campaign, playerName) {
        console.log(campaign._id);
        console.log(playerName);
        return Meteor.call("addPlayer", campaign, playerName);
    },
    
    upsert: function(campaign, callback) {
        return Meteor.call("upsertCampaign", campaign, function(error, result) {
            callback(result.insertedId)
        });
    },

    remove: function(campaign) {
        return Meteor.call("removeCampaign", campaign);
    }
};