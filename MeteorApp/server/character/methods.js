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
    removeChracterItem: function(_id, itemId) {
        if (!_id || !item || !Meteor.user()) return null;
        //do something here about deleting the item
        removeItem(itemId);
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
    }
});