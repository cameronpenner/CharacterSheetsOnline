Campaign = {
    findAll: function() {
        return Collections.Campaigns.find().fetch();
    },
    find: function(_id) {
        return Collections.Campaigns.findOne({_id: _id});
    },
    insert: function(campaign) {
        return Meteor.call("insertCampaign", campaign);
    },

    addPlayer: function(player) {
        return Meteor.call("addPlayer", player);
    },
    
    upsert: function(campaign, callback) {
        return Meteor.call("upsertCampaign", campaign, function(error, result) {
            callback(result.insertedId)
        });
    },
    update: function(campaign) {
        return Meteor.call("updateCampaign", campaign);
    },
    remove: function(campaign) {
        return Meteor.call("removeCampaign", campaign);
    }
};