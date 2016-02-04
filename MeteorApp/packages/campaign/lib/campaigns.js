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
    upsert: function(campaign) {
        return Meteor.call("upsertCampaign", campaign);
    },
    update: function(campaign) {
        return Meteor.call("updateCampaign", campaign);
    },
    remove: function(campaign) {
        return Meteor.call("removeCampaign", campaign);
    }
};