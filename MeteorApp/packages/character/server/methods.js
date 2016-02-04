var newCharValues = function() {
    return {
        owner: Meteor.user()._id,
        username: Meteor.user().emails[0].address,
        createdAt: new Date()
    };
}

Meteor.methods({
    insertCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.insert(_.extend(character, newCharValues()));
    },
    upsertCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.upsert({
            _id: character._id
        }, {
            $set: character
        }, {
            $setOnInsert: _.extend(character, newCharValues())
        });
    },
    updateCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.update(character);
    },
    removeCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.remove({_id: character._id});
    }
});