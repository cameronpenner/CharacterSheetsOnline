var newItemValues = function() {
    return {
        name: null,
    };
};

Meteor.methods({
    upsertItem: function(item) {
        if (!item || !Meteor.user()) return null;
        var result = Items.upsert({
            _id: item._id
        }, {
            $set: item
        });
        return result;
    },
    removeItem: function(itemId) {
        if (!itemId || !Meteor.user()) return null;
        c = Items.findOne(itemId);
        if(c.attributes){
            Meteor.call("removeAllAttributes", c);
        }
        return Items.remove({_id: itemId});
    },
    addItemAttribute: function(_id, attribute) {
        if (!_id || !attribute || !Meteor.user()) return null;
        newAttribute = Meteor.call("upsertAttribute", attribute);
        Items.update({
            _id: _id
        },{
            $push: {
                attributes: newAttribute.insertedId
            }
        });
        return newAttribute;
    },
    removeItemAttribute: function(_id, attribute) {
        if (!_id || !attribute || !Meteor.user()) return null;
        Meteor.call("removeAttribute", attribute);
        return Items.update({
            _id: _id
        }, {
            $pull: {
                attributes: attributeId
            }
        });    
    },
    removeAllItems: function(owner) {
        if (!owner || !Meteor.user()) return null;
        return Items.remove({_id: {$in: owner.items}});
    }
});