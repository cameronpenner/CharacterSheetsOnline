Meteor.startup(function() {
    if (Meteor.isServer) {
        process.env.JASMINE_SERVER_UNIT = 1;
    }
})