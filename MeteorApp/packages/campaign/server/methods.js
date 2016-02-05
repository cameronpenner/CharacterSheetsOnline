var newCampaignValues = function() {
    return {
        game_master: Meteor.user()._id,
        game_master_name: Meteor.user().emails[0].address,
        createdAt: new Date()
    };
}

Meteor.methods({
    addPlayer: function(campaign, playerName) {
        if (!campaign || !Meteor.user() || !playerName) return null;
        return Collections.Campaigns.update({
            _id: campaign._id
        }, {
            $addToSet: {players: playerName}
        });
    },

    upsertCampaign: function(campaign) {
        if (!campaign || !Meteor.user()) return null;
        return Collections.Campaigns.upsert({
            _id: campaign._id
        }, {
            $set: campaign
        }, {
            $setOnInsert: _.extend(campaign, newCampaignValues())
        });
    },

    removeCampaign: function(campaign) {
        return Collections.Campaigns.remove({_id: campaign._id});
    }
});