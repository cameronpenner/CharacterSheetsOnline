Meteor.publish('item-list', function () {
    return Items.find();
});

Meteor.publish('item', function (_id) {
    return Items.find({_id: _id});
});