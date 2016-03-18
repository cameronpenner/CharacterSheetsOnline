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
            spyOn(Items, "findOne").and.returnValue({});
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

    describe("addItemAttribute", function() {

        beforeEach(function() {
            spyOn(Items, "update");
            spyOn(Attributes, "upsert").and.returnValue("test-attribute");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("addItemAttribute")).toBe(null);
            expect(Items.update.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("addItemAttribute", null, "a")).toBe(null);
            expect(Meteor.call("addItemAttribute", "a", null)).toBe(null);
            expect(Items.update.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("addItemAttribute", {}, {})).toBe("test-attribute");
            expect(Items.update.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("addItemAttribute", "test-id", {name: "test-item"})).toBe("test-attribute");
            expect(Items.update.calls.count()).toEqual(1);
        });
    });

    describe("removeItemAttribute", function() {

        beforeEach(function() {
            spyOn(Items, "update");
            spyOn(Attributes, "remove").and.returnValue({attributeId:"test-attribute"});
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeItemAttribute")).toBe(null);
            expect(Items.update.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("removeItemAttribute", "a", null)).toBe(null);
            expect(Meteor.call("removeItemAttribute", null, "a")).toBe(null);
            expect(Items.update.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("removeItemAttribute", {}, {})).toBe(undefined);
            expect(Items.update.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("removeItemAttribute", "test-id", {name: "test-item"})).toBe(undefined);
            expect(Items.update.calls.count()).toEqual(1);
        });
    });

    describe("removeAllItems", function() {

        beforeEach(function() {
            spyOn(Items, "remove").and.returnValue("test-value");
        });

        it("return null and don't call collection if no parameter given", function() {
            expect(Meteor.call("removeAllItems")).toBe(null);
            expect(Items.remove.calls.any()).toEqual(false);
        });

        it("return null and don't call collection if parameter is null", function() {
            expect(Meteor.call("removeAllItems", null)).toBe(null);
            expect(Items.remove.calls.any()).toEqual(false);
        });

        it("return undefined and call collection if parameter is {}", function() {
            expect(Meteor.call("removeAllItems", {})).toBe("test-value");
            expect(Items.remove.calls.count()).toEqual(1);
        });

        it("return undefined and call collection if parameter is valid", function () {
            expect(Meteor.call("removeAllItems", {name: "test-item"})).toBe("test-value");
            expect(Items.remove.calls.count()).toEqual(1);
        });
    });
});