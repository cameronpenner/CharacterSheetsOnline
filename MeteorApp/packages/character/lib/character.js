Character = {
    findAll: function() {
        return Collections.Characters.find().fetch();
    },
    find: function(_id) {
        return Collections.Characters.findOne({_id: _id});
    },
    insert: function(character) {
        return Meteor.call("insertCharacter", character);
    },
    upsert: function(character) {
        return Meteor.call("upsertCharacter", character);
    },
    update: function(character) {
        return Meteor.call("updateCharacter", character);
    },
    remove: function(character) {
        return Meteor.call("removeCharacter", character);
    }
};