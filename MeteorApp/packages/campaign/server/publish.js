Meteor.publish('campaign-list', function () {
	var user = Meteor.users.findOne({_id: this.userId});
    return Collections.Campaigns.find({
		$or: [
			{game_master: this.userId},
			{players: {$in: [user.username]}}
		]
	});
});

Meteor.publish('campaign', function (_id) {
    return Collections.Campaigns.find({_id: _id});
});

Meteor.publish('campaign-player-list', function(_id) {
	return Collections.Campaigns.find({_id: _id}, {players: 1});
});