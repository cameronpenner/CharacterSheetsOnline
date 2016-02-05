Meteor.publish('campaign-list', function (_id, playerName) {
    return Collections.Campaigns.find({$or: [{game_master: this.userId}, {players: playerName}]});
});

Meteor.publish('campaign', function (_id) {
    return Collections.Campaigns.find({_id: _id});
});

Meteor.publish('campaign-player-list', function(_id) {
	return Collections.Campaigns.find({_id: _id}, {players: 1});
});