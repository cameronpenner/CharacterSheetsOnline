var newCampaignValues = function() {
    return {
        game_master: Meteor.userId(),
        game_master_name: Meteor.user().username,
        createdAt: new Date()
    };
}

Meteor.methods({

    addPlayer: function(campaign, playerName) {
        if (!campaign || !Meteor.user() || !playerName) return null;
        return Campaigns.update({
            _id: campaign._id
        }, {
            $addToSet: {players: playerName}
        });
    },

    upsertCampaign: function(campaign) {
        if (!campaign || !Meteor.user()) return null;
        return Campaigns.upsert({
            _id: campaign._id
        }, {
            $set: campaign
        }, {
            $setOnInsert: _.extend(campaign, newCampaignValues())
        });
    },

    removeCampaign: function(campaign) {
        return Campaigns.remove({_id: campaign._id});
    }
});