Meteor.publish('campaign-list', function () {
	var user = Meteor.users.findOne({_id: this.userId});
	if (!user) return null;
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

Meteor.publish('campaign-list-character', function(_id) {
	return Campaigns.find({character_ids: {$in: [_id]}}); //should find all the campaigns that have this character id in them.
});