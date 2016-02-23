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
    addInventoryItem: function(_id, item) {
        if (!_id || !item || !Meteor.user()) return null;
        return Characters.update({
            _id: _id
        }, {
            $push: {
                inventory: item
            }
        });
    },
    removeInventoryItem: function(_id, item) {
        if (!_id || !item || !Meteor.user()) return null;
        return Characters.update({
            _id: _id
        }, {
            $pull: {
                inventory: item
            }
        });
    },
    addAttribute: function(_id, attribute) {
        if (!_id || !attribute || !Meteor.user()) return null;
        return Characters.update({
            _id: _id
        },{
            $push: {
                    attributeList: attribute
            }
        });
    }
});