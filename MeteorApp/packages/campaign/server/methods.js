var newCharValues = function() {
    return {
        game_master: Meteor.user()._id,
        createdAt: new Date()
    };
}

Meteor.methods({
    insertCampaign: function(campaign) {
        if (!campaign || !Meteor.user()) return null;
        return Collections.Characters.insert(_.extend(campaign, newCharValues()));
    },

    addPlayer: function(player) {
        if (!player) return null;
    },

    upsertCampaign: function(campaign) {
    },
    updateCampaign: function(campaign) {
    },
    removeCampaign: function(campaign) {
    }
});