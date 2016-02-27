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
    removeAllItems: function(owner) {
        if (!owner || !Meteor.user()) return null;
        return Items.remove({_id: {$in: owner.items}});
    }
});