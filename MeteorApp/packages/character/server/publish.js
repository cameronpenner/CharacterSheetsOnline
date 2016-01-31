Meteor.publish('character-list', function () {
    return Collections.Character.find({owner: this.userId});
});
