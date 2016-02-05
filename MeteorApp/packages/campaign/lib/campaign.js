Campaign = {
    findAll: function() {
        return result = Collections.Campaigns.find().fetch();
    },
    find: function(_id) {
        return Collections.Campaigns.findOne({_id: _id});
    },
    insert: function(campaign) {
        return Meteor.call("insertCampaign", campaign);
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
    update: function(campaign) {
        return Meteor.call("updateCampaign", campaign);
    },
    remove: function(campaign) {
        return Meteor.call("removeCampaign", campaign);
    }
};