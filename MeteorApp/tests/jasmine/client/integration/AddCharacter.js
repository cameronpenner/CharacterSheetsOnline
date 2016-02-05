//var browseToNewCharPage = function() {
//    var a = document.getElementById("navCharNew");
//    a.dispatchEvent(new MouseEvent("click", {
//        'view': window,
//        'bubbles': true,
//        'cancelable': true
//    }));
//    console.log(this);
//};
//
//describe("Add Character", function() {
//    beforeEach(function() {
//        browseToNewCharPage();
//    });
//
//    it("should have 'Edit Character' Heading", function() {
//        expect($('h3').text()).toEqual("Edit Character");
//    });
//
//    it("should have empty text input", function() {
//        expect($('input:text').value).toEqual(undefined);
//    });
//
//    it("should have 'Save' button", function() {
//        expect($('input:button').text()).toEqual('Save');
//    });
//
//});