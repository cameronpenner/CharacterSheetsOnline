Character = {
    getEmptyJSON: function() {
        return {
            name: "",
            inventory: [],
            attributes: []
        };
    },
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
    },
    removeById: function(_id) {
        return Meteor.call("removeCharacter", {_id: _id});
    },
    changeName: function(_id, newName) {
        return Meteor.call("upsertCharacter", {_id: _id, name: newName});
    },
    addItem: function(character, item) {
        return Meteor.call("addInventoryItem", character._id, item);
    },
    removeItem: function(character, item) {
        //console.log ("in addItem", character, item);
        return Meteor.call("removeInventoryItem", character._id, item);
    },
    addAttribute: function(character, attribute) {
        return Meteor.call("addAttribute", character._id, attribute)
    }
};