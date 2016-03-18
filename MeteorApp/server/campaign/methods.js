var newCampaignValues = function() {
    return {
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

        if (!campaign.game_master) {
            campaign.game_master = Meteor.userId();
        }
        if (!campaign.game_master_name) {
            campaign.game_master_name = Meteor.user().username;
        }

        return Campaigns.upsert({
            _id: campaign._id
        }, {
            $set: campaign
        }, {
            $setOnInsert: _.extend(campaign, newCampaignValues())
        });
    },

    removeCampaign: function(campaign) {
        if (!campaign || !campaign._id || ! Meteor.user()) return null;
        return Campaigns.remove({_id: campaign._id});
    },

    canEdit: function(campaign) {
        if(!campaign) return null;
        if (Meteor.user().username === campaign.game_master_name) {
            return true;
        } else {
            return false;
        }
    },

    playerExists: function(username) {
        if (!Meteor.user()) return null;

        console.log(username);
        if (Meteor.users.findOne({username: username})) {
            return true;
        } else {
            return false;
        }
    }
});