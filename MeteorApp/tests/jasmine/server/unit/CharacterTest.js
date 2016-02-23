describe("Character Methods", function() {
    'use strict';

    describe("upsertCharacter", function() {
        it("return null if no parameter given", function() {
            expect(Meteor.call("upsertCharacter")).toBe(null);
        });

        it("return null if parameter is null", function() {
            expect(Meteor.call("upsertCharacter", null)).toBe(null);
        });

        it("return undefined if parameter is {}", function() {
            expect(Meteor.call("upsertCharacter", {})).toBe(undefined);
        });

        it("should insert character if parameter is valid", function () {
            spyOn()

            expect(Meteor.call("upsertCharacter", {
                name: "test-character"
            })).toBe(undefined);


        })
    });
});