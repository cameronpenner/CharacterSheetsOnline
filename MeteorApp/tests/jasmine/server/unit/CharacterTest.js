describe("Character Methods", function() {
    'use strict';

    describe("upsertCharacter", function() {
        it("return null if no parameter given", function() {
            expect(Meteor.call("upsertCharacter")).toBe(null);
        });

        it("does not call collection if no parameter given", function() {
            spyOn(Characters, "upsert");
            expect(Characters.upsert.calls.any()).toEqual(false);
        });

        it("return null if parameter is null", function() {
            expect(Meteor.call("upsertCharacter", null)).toBe(null);
        });

        it("does not call collection if parameter is null", function() {
            spyOn(Characters, "upsert");
            expect(Characters.upsert.calls.any()).toEqual(false);
        });

        it("return undefined if parameter is {}", function() {
            expect(Meteor.call("upsertCharacter", {})).toBe(undefined);
        });

        it("does not call collection if parameter is null", function() {
            spyOn(Characters, "upsert");
            expect(Characters.upsert.calls.any()).toEqual(false);
        });

        it("shouldn't call collection if parameter is valid but user isn't logged in", function () {
            spyOn(Characters, "upsert");

            expect(Meteor.call("upsertCharacter", {
                name: "test-character"
            })).toBe(undefined);

            expect(Characters.upsert.calls.count()).toEqual(1);
        })
    });
});