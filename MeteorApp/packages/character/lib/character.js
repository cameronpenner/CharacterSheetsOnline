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
    upsert: function(character) {
        return Meteor.call("upsertCharacter", character);
    },
    remove: function(character) {
        return Meteor.call("removeCharacter", character);
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