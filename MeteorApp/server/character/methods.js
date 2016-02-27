var newCharValues = function() {
    return {
        owner: Meteor.userId(),
        owner_name: Meteor.user().username,
        createdAt: new Date()
    };
};

Meteor.methods({
    upsertCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Characters.upsert({
            _id: character._id
        }, {
            $set: character
        }, {
            $setOnInsert: _.extend(character, newCharValues())
        });
    },
    removeCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Characters.remove({_id: character._id});
    },
    addCharacterItem: function(_id, item) {
        if (!_id || !item || !Meteor.user()) return null;
        //do something here about creating the item
        newItem = Meteor.call("upsertItem", item);
        return Characters.update({
            _id: _id
        }, {
            $push: {
                items: newItem.insertedId
            } 
        });
    },
    removeCharacterItem: function(_id, itemId) {
        if (!_id || !itemId || !Meteor.user()) return null;
        Meteor.call("removeItem", itemId);
        return Characters.update({
            _id: _id
        }, {
            $pull: {
                items: itemId
            }
        });
    },
    addCharacterAttribute: function(_id, attribute) {
        if (!_id || !attribute || !Meteor.user()) return null;
        newAttribute = Meteor.call("upsertAttribute", attribute);
        return Characters.update({
            _id: _id
        },{
            $push: {
                attributes: newAttribute.insertedId
            }
        });
    },

    getCharacter: function(_id) {
        if (!_id) return null;
        return Characters.findOne(_id);
    },

    removeCharacterAttribute: function(_id, attributeId) {
        if (!_id || !attributeId || !Meteor.user()) return null;
        Meteor.call("removeAttribute", attributeId);
        return Characters.update({
            _id: _id
        }, {
            $pull: {
                attributes: attributeId
            }
        });    
    },
});