describe("Character Methods", function() {
    'use strict';

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
});