var newAttributeValues = function() {
    return {
        name: null,
        value: null,
    };
};

Meteor.methods({
    upsertAttribute: function(attribute) {
        if (!attribute || !Meteor.user()) return null;
        var result = Attributes.upsert({
            _id: attribute._id
        }, {
            $set: attribute
        });
        return result;
    },
    removeAttribute: function(attributeId) {
        if (!attributeId || !Meteor.user()) return null;
        return Attributes.remove({_id: attributeId});
    }
});