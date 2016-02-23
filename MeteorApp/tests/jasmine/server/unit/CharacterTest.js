describe("Character", function() {
    'use strict';
    var characterEmptyJSON = {
        name: "",
        inventory: [],
        attributes: []
    };

    describe("getEmptyJSON", function() {
        it("Should return empty JSON of a character", function () {
            expect(Character.getEmptyJSON()).toEqual(characterEmptyJSON);
        });
    });

    describe("findAll", function() {
        it("Should return null when there are no characters in the collection",
            function () {
                expect(Character.findAll()).toBe(null);
            }
        );
    });

    describe("find", function() {
        it("Should return null when there are no characters in the collection",
            function () {
                expect(Character.find()).toBe(null);
            }
        )
    });

    describe("upsert", function() {
        it("Should return null if no argument is passed", function () {
            expect(Character.upsert(null)).toBe(null);
        });
    });

    describe("remove", function () {
        it("Should return null if no argument is passed", function() {
            expect(Character.remove(null)).toBe(null);
        })
    });
});