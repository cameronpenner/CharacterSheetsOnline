Meteor.publish('character-list', function () {
    return Characters.find({$or: [{owner: this.userId}, {owner: "public"}]});
});

Meteor.publish('character', function (_id) {
    return Characters.find({_id: _id});
});

Meteor.publish('all-character-list', function(){
	return Characters.find();
});