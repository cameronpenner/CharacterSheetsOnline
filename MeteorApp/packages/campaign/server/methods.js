Meteor.methods({
    insertCampaign: function(campaign) {
        console.log("insert");
    },
    upsertCampaign: function(campaign) {
        console.log("upsert");
    },
    updateCampaign: function(campaign) {
        console.log("update");
    },
    removeCampaign: function(campaign) {
        console.log("remove");
    }
});