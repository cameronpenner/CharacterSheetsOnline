Character = {
    getEmptyJSON: function() {
        return {
            name: "",
            inventory: [],
            attributes: []
        };
    },
    findAll: function() {
        var cursor =  Collections.Characters.find();
        if (cursor) return cursor.fetch();
        return null;
    },
    find: function(_id) {
        var result = Collections.Characters.findOne({_id: _id});
        if (result) return result;
        return null;
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