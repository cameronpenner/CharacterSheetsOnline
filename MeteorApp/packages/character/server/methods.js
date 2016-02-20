var newCharValues = function() {
    return {
        owner: Meteor.userId(),
        owner_name: Meteor.user().username,
        createdAt: new Date()
    };
};

Meteor.methods({
    insertCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.insert(_.extend(character, newCharValues()));
    },
    upsertCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        var result = Collections.Characters.upsert({
            _id: character._id
        }, {
            $set: character
        }, {
            $setOnInsert: _.extend(character, newCharValues())
        });

        console.log("in Meteor.Methods.upsertCharacter", result);
    },
    updateCharacter: function(character) {
        console.log(character);
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.update({_id: character._id}, {$set: character});
    },
    removeCharacter: function(character) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.remove({_id: character._id});
    },
    addInventoryItem: function(_id, item) {
        if (!_id || !item || !Meteor.user()) return null;
        //console.log("in Meteor.Methods.AddInventoryItem", _id, item);
        return Collections.Characters.update({
            _id: _id
        }, {
            $push: {
                inventory: item
            }
        });
    },
    removeInventoryItem: function(_id, item) {
        if (!character || !Meteor.user()) return null;
        return Collections.Characters.update({
            _id: _id
        }, {
            $pull: {
                inventory: item
            }
        });
    },
    addAttribute: function(_id, attribute) {
        if (!_id || !attribute || !Meteor.user()) return null;
        return Collections.Characters.update({
            _id: _id
        },{
            $push: {
                    attributeList: attribute
            }
        });
    }
});