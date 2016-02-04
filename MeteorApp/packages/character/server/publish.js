Meteor.publish('character-list', function () {
    return Collections.Characters.find({$or: [{owner: this.userId}, {owner: "public"}]});
});

Meteor.publish('character', function (_id) {
    return Collections.Characters.find({_id: _id});
});
