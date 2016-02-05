Meteor.publish('campaign-list', function () {
    return Collections.Campaigns.find({$or: [{game_master: this.userId}, {owner: "public"}]});
});

Meteor.publish('campaign', function (_id) {
    return Collections.Campaigns.find({_id: _id});
});
