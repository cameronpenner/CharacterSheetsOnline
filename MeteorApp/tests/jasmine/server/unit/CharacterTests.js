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

    describe("addCharacterItem", function() {

        beforeEach(function() {
            spyOn(Items, "upsert").and.returnValue({insertedId: "test-id"});
            spyOn(Characters, "update");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("addCharacterItem")).toBe(null);
            expect(Items.upsert.calls.any()).toEqual(false);
            expect(Characters.update.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameters are null", function() {
            expect(Meteor.call("addCharacterItem", null, null)).toBe(null);
            expect(Items.upsert.calls.any()).toEqual(false);
            expect(Characters.update.calls.any()).toEqual(false);
        });

        it("return item and call collection if parameter is valid", function () {
            expect(Meteor.call("addCharacterItem", "test-id", {name: "test-item"})).not.toBe(undefined);
            expect(Items.upsert.calls.count()).toEqual(1);
            expect(Characters.update.calls.count()).toEqual(1);
        });
    });

    describe("removeCharacterItem", function() {

        beforeEach(function() {
            spyOn(Items, "remove");
            spyOn(Items, "findOne").and.returnValue({})
            spyOn(Characters, "update");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeCharacterItem")).toBe(null);
            expect(Characters.update.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameters are null", function() {
            expect(Meteor.call("removeCharacterItem", null, null)).toBe(null);
            expect(Characters.update.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("removeCharacterItem", "test-id", {name: "test-item"})).toBe(undefined);
            expect(Characters.update.calls.count()).toEqual(1);
        });
    });

    describe("addCharacterAttribute", function() {

        beforeEach(function() {
            spyOn(Attributes, "upsert").and.returnValue({insertedId:"test-id"});
            spyOn(Characters, "update");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("addCharacterAttribute")).toBe(null);
            expect(Attributes.upsert.calls.count()).toEqual(0);
            expect(Characters.update.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("addCharacterAttribute", null)).toBe(null);
            expect(Attributes.upsert.calls.count()).toEqual(0);
            expect(Characters.update.calls.any()).toEqual(false);
        });

        it("return undefined and don't call collection if parameter is {}", function() {
            expect(Meteor.call("addCharacterAttribute", "", {})).toBe(null);
            expect(Attributes.upsert.calls.count()).toEqual(0);
            expect(Characters.update.calls.count()).toEqual(0);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("addCharacterAttribute", "test-id", {name: "test-character"})).toBe(undefined);
            expect(Attributes.upsert.calls.count()).toEqual(1);
            expect(Characters.update.calls.count()).toEqual(1);
        });
    });

    describe("getCharacter", function() {

        beforeEach(function() {
            spyOn(Characters, "findOne").and.returnValue("test-value");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("getCharacter")).toBe(null);
            expect(Characters.findOne.calls.any()).toEqual(false);
        });

        it("return character if one is found with a given id", function() {
            expect(Meteor.call("getCharacter", "test-id")).toBe("test-value");
            expect(Characters.findOne.calls.any()).toEqual(true);
        })
    });

    describe("removeAll", function() {

        beforeEach(function() {
            spyOn(Characters, "findOne").and.returnValue({});
        });

        it("return null and don't call collection of no parameter given", function() {
            expect(Meteor.call("removeAll")).toBe(null);
            expect(Characters.findOne.calls.any()).toEqual(false);
        });

        it("return undefined  and call collection once if id given but character found has no items or attributes", function() {
            expect(Meteor.call("removeAll", "test-id")).toBe(undefined);
            expect(Characters.findOne.calls.count()).toEqual(1);
        })
    });

    describe("swapItems", function() {

        beforeEach(function() {
            spyOn(Characters, "update");
        });

        it("return null and don't call collection if any parameter is null", function() {
            expect(Meteor.call("swapItems", "a", "b", null)).toBe(null);
            expect(Meteor.call("swapItems", "a", null, "c")).toBe(null);
            expect(Meteor.call("swapItems", null, "b", "c")).toBe(null);
            expect(Meteor.call("swapItems", null, null, null)).toBe(null);
            expect(Characters.update.calls.count()).toEqual(0);
        })

        it("return undefined and call collection twice if parameters are valid", function() {
            expect(Meteor.call("swapItems", "a", "b", "c")).toBe(undefined);
            expect(Characters.update.calls.count()).toEqual(2);
        })
    })
});
