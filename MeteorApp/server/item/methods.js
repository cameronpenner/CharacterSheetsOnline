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
        return Items.remove({_id: itemId});
    },
    addItemAttribute: function(_id, attributeId) {
        if (!_id || !attributeId || !Meteor.user()) return null;
        newAttribute = Meteor.call("upsertAttribute", attributeId);
        return Items.update({
            _id: _id
        },{
            $push: {
                attributes: newAttribute.insertedId
            }
        });
    },
    removeItemAttribute: function(_id, attributeId) {
        if (!_id || !attributeId || !Meteor.user()) return null;
        Meteor.call("removeAttribute", attributeId);
        return Items.update({
            _id: _id
        }, {
            $pull: {
                attributes: attributeId
            }
        });    
    },
});