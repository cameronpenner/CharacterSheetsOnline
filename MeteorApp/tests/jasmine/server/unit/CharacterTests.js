describe("Character Methods", function() {
    'use strict';

    describe("upsertCharacter", function() {

        beforeEach(function() {
            spyOn(Characters, "upsert");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("upsertCharacter")).toBe(null);
            expect(Characters.upsert.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("upsertCharacter", null)).toBe(null);
            expect(Characters.upsert.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("upsertCharacter", {})).toBe(undefined);
            expect(Characters.upsert.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("upsertCharacter", {name: "test-character"})).toBe(undefined);
            expect(Characters.upsert.calls.count()).toEqual(1);
        });
    });

    describe("removeCharacter", function() {

        beforeEach(function() {
            spyOn(Characters, "remove");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeCharacter")).toBe(null);
            expect(Characters.remove.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("removeCharacter", null)).toBe(null);
            expect(Characters.remove.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("removeCharacter", {})).toBe(undefined);
            expect(Characters.remove.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("removeCharacter", {name: "test-character"})).toBe(undefined);
            expect(Characters.remove.calls.count()).toEqual(1);
        });
    });
});