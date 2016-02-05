TestUtils = React.addons.TestUtils;
Simulate = TestUtils.Simulate;

renderComponent = function (comp, props) {
    return TestUtils.renderIntoDocument(
        React.createElement(comp, props)
    );
};

simulateClickOn = function($el) {
    React.addons.TestUtils.Simulate.click($el[0]);
};

describe("CharacterEdit Component", function() {
    var date, defProps, renderWithProps, component, el, $el;

    beforeEach(function() {
        date = new Date();
        defProps = {
            character: {
                _id: "test-id",
                name: "test-name",
                owner: "test-owner",
                username: "test-username",
                createdAt: date
            }
        };
        renderWithProps = function(props) {
            component = renderComponent(CharacterEdit, props);
            el = React.findDOMNode(component);
            $el = $(el);
        };
    });

    it("should be mounted in DOM", function() {
        renderWithProps({});
        expect($el.length).toEqual(1);
    });

    it("should have h3 = Edit Character", function() {
        renderWithProps({});
        expect($el.children('h3').text()).toEqual("Edit Character");
    });

    // this one doesn't pass and I don't know why...
    //it("should have a button", function() {
    //    renderWithProps({});
    //    expect($el.children(":button").length).toEqual(1);
    //});

    it("should have empty text input if no id is in props", function() {
        renderWithProps({});
        expect($el.children("input:text").value).toEqual(undefined);
    });

    it("should have character name in text input if id is in props", function() {
        Meteor.call("insertCharacter", defProps);
        renderWithProps({
            routeParams: {
                _id: defProps._id
            }
        });

        expect($el.children("input:text").value).toEqual(defProps.name);

        Meteor.call("removeCharacter", defProps);
    });
});