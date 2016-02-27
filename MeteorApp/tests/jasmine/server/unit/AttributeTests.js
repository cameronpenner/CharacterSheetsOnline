describe("Attribute Methods", function() {
    'use strict';

    describe("upsertAttribute", function() {

        beforeEach(function() {
            spyOn(Attributes, "upsert");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("upsertAttribute")).toBe(null);
            expect(Attributes.upsert.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("upsertAttribute", null)).toBe(null);
            expect(Attributes.upsert.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("upsertAttribute", {})).toBe(undefined);
            expect(Attributes.upsert.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("upsertAttribute", {name: "test-attribute"})).toBe(undefined);
            expect(Attributes.upsert.calls.count()).toEqual(1);
        });
    });

    describe("removeAttribute", function() {

        beforeEach(function() {
            spyOn(Characters, "remove");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeAttribute")).toBe(null);
            expect(Attributes.remove.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("removeAttribute", null)).toBe(null);
            expect(Attributes.remove.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("removeAttribute", {})).toBe(undefined);
            expect(Attributes.remove.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("removeAttribute", {name: "test-attribute"})).toBe(undefined);
            expect(Attributes.remove.calls.count()).toEqual(1);
        });
    });
});