describe("Character Methods", function() {
    'use strict';

    describe("addPlayer", function() {
        beforeEach(function() {
            spyOn(Campaigns, "update").and.returnValue("test-value");
        });

        it("return null and don't call collection if parameters invalid", function() {
            expect(Meteor.call("addPlayer")).toBe(null);
            expect(Campaigns.update.calls.count()).toEqual(0);
        });

        it("return something and call collection of parameters are valid", function() {
            expect(Meteor.call("addPlayer", "c", "p")).toBe("test-value");
            expect(Campaigns.update.calls.count()).toEqual(1);
        });
    });

    describe("upsertCampaign", function() {

        beforeEach(function() {
            spyOn(Campaigns, "upsert");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("upsertCampaign")).toBe(null);
            expect(Campaigns.upsert.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("upsertCampaign", null)).toBe(null);
            expect(Campaigns.upsert.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("upsertCampaign", {})).toBe(undefined);
            expect(Campaigns.upsert.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("upsertCampaign", {name: "test-campaign"})).toBe(undefined);
            expect(Campaigns.upsert.calls.count()).toEqual(1);
        });
    });

    describe("removeCampaign", function() {

        beforeEach(function() {
            spyOn(Campaigns, "remove");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeCampaign")).toBe(null);
            expect(Campaigns.remove.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("removeCampaign", null)).toBe(null);
            expect(Campaigns.remove.calls.any()).toEqual(false);
        });

        it("return null and call collection if parameter is {}", function() {
            expect(Meteor.call("removeCampaign", {})).toBe(null);
            expect(Campaigns.remove.calls.any()).toEqual(false);
        });

        it("return null and call collection if parameter is valid", function () {
            expect(Meteor.call("removeCampaign", {name: "test-campaign"})).toBe(null);
            expect(Campaigns.remove.calls.any()).toEqual(false);
        });
    });

    describe("canEdit", function() {
        beforeEach(function() {
            spyOn(Meteor, "user").and.returnValue({username: "test-user"});
        });

        it("return null and don't call collection if parameter invalid", function() {
            expect(Meteor.call("canEdit")).toBe(null);
            expect(Meteor.user.calls.count()).toEqual(0);
        });

        it("return false if user is not the game master", function() {
            expect(Meteor.call("canEdit", {game_master_name: "wrong-name"})).toBe(false);
            expect(Meteor.user.calls.count()).toEqual(1);
        });

        it("return true if user is the game master", function() {
            expect(Meteor.call("canEdit", {game_master_name: "test-user"})).toBe(true);
            expect(Meteor.user.calls.count()).toEqual(1);
        });
    });

    describe("playerExists", function() {
        it("return null if user not logged in", function() {
            spyOn(Meteor, "user").and.returnValue(null);
            expect(Meteor.call("playerExists")).toBe(null);
            expect(Meteor.user.calls.count()).toEqual(1);
        });

        it("return true if user exists", function() {
            spyOn(Meteor, "user").and.returnValue(true);
            spyOn(Meteor.users, "findOne").and.returnValue("test-user");
            expect(Meteor.call("playerExists")).toBe(true);
            expect(Meteor.user.calls.count()).toEqual(1);
            expect(Meteor.users.findOne.calls.count()).toEqual(1);
        });

        it("return false if user doesn't exist", function() {
            spyOn(Meteor, "user").and.returnValue(true);
            spyOn(Meteor.users, "findOne").and.returnValue(null);
            expect(Meteor.call("playerExists")).toBe(false);
            expect(Meteor.user.calls.count()).toEqual(1);
            expect(Meteor.users.findOne.calls.count()).toEqual(1);
        });
    });
});