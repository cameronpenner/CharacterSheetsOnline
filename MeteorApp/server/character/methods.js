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

        if (character._id) {
            return Characters.update({_id: character._id}, {$set: character});
        }
        else {
            return Characters.upsert({
                _id: character._id
            }, {
                $set: character
            }, {
                $setOnInsert: _.extend(character, newCharValues())
            });
        }

    },
    removeCharacter: function(character) {
        if (!character || !Meteor.user()) return null;

        // Remove Character from all campaigns they are recorded in
        var campaigns = Campaigns.find({character_ids: {$in: [character._id]}}).fetch();
        _.each(campaigns, function(campaign) {
            console.log(campaign);
            Campaigns.update({
                _id: campaign._id
            }, {
                $pull: {
                    character_ids: {$in: [character._id]}
                }
            });
        });
        console.log("remove character");
        console.log(Campaigns.find({character_ids: {$in: [character._id]}}).fetch());
        return Characters.remove({_id: character._id});
    },
    addCharacterItem: function(_id, item) {
        if (!_id || !item || !Meteor.user()) return null;
        //do something here about creating the item
        newItem = Meteor.call("upsertItem", item);
        Characters.update({
            _id: _id
        }, {
            $push: {
                items: newItem.insertedId
            } 
        });
        return newItem;
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
    removeAll: function(_id) {
        if(!_id) return null;
        c = Characters.findOne(_id);
        if(c.items){
            Meteor.call("removeAllItems", c);
            Characters.update({
                _id: _id
            }, {
                $pull: {
                    items: {$in: c.items}
                }
            });
        }
        if(c.attributes){
            Meteor.call("removeAllAttributes", c);
            Characters.update({
                _id: _id
            }, {
                $pull: {
                    attributes: {$in: c.attributes}
                }
            });
        }
    },
    swapItems: function(c1_id, c2_id, item_id) {
        if(!c1_id || ! c2_id || !item_id) return null;
        Characters.update({
            _id: c2_id
        },{
            $push: {
                items: item_id
            }
        });

        Characters.update({
            _id: c1_id
        },{
            $pull: {
                items: item_id
            }
        });
    },
});