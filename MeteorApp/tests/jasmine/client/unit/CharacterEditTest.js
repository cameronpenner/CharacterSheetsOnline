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

    it("should have h3 Edit Character", function() {
        renderWithProps({});
        expect($el.children('h3').text()).toEqual("Edit Character");
    });
});