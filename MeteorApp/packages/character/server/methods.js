Meteor.methods({
    insertCharacter: function(character) {
        return Collections.Character.insert(character)
    }
});