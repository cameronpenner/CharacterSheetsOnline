describe("Item Methods", function() {
    'use strict';

    describe("upsertItem", function() {

        beforeEach(function() {
            spyOn(Items, "upsert");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("upsertItem")).toBe(null);
            expect(Items.upsert.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("upsertItem", null)).toBe(null);
            expect(Items.upsert.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("upsertItem", {})).toBe(undefined);
            expect(Items.upsert.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("upsertItem", {name: "test-item"})).toBe(undefined);
            expect(Items.upsert.calls.count()).toEqual(1);
        });
    });

    describe("removeItem", function() {

        beforeEach(function() {
            spyOn(Items, "remove");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeItem")).toBe(null);
            expect(Items.remove.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("removeItem", null)).toBe(null);
            expect(Items.remove.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("removeItem", {})).toBe(undefined);
            expect(Items.remove.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("removeItem", {name: "test-item"})).toBe(undefined);
            expect(Items.remove.calls.count()).toEqual(1);
        });
    });
});