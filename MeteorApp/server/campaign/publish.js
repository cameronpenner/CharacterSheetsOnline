Meteor.publish('campaign-list', function () {
	var user = Meteor.users.findOne({_id: this.userId});
    return Campaigns.find({
		$or: [
			{game_master_name: user.username},
			{players: {$in: [user.username]}}
		]
	});
});

Meteor.publish('campaign-player-list', function(_id) {
	return Campaigns.find({_id: _id}, {players: 1});
});