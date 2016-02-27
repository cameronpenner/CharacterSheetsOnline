Meteor.publish('attribute-list', function () {
    return Attributes.find();
});

Meteor.publish('attribute', function (_id) {
    return Attributes.find({_id: _id});
});