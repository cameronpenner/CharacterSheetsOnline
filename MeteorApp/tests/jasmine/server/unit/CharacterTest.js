describe("Characters Collection", function() {
    'use strict';

    it("Characters.findAll()", function() {
        var result = {};

        spyOn(Collections.Characters, 'find').and.returnValue(result);
        expect(Character.findAll()).toBe(result);
        expect(Collections.Characters.find.calls.argsFor(0)).toEqual([]);
    });

    it("Characters.find()", function() {
        var _id = '3',
            result = {_id: '3', name: 'joe'};

        spyOn(Collections.Characters, 'find').and.returnValue(result);
        expect(Character.find(_id)).toBe(result);
        expect(Collections.Characters.find.calls.argsFor(0)).toEqual([_id]);
    });
});