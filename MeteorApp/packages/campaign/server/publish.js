Meteor.publish('campaign-list', function () {
	var self = this;
	var user = Meteor.users.findOne(this.userId);
    return Collections.Campaigns.find({$or: [{game_master: self.userId}, {players: user.emails[0].address}]});
});

Meteor.publish('campaign', function (_id) {
    return Collections.Campaigns.find({_id: _id});
});

Meteor.publish('campaign-player-list', function(_id) {
	return Collections.Campaigns.find({_id: _id}, {players: 1});
});