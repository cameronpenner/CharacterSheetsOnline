CharacterPreview = React.createClass({
    propTypes: {
        _id: React.PropTypes.string,
        path: React.PropTypes.string
    },

    mixins: [ReactMeteorData],

    getInitialState() {
        return {};
    },

    getMeteorData() {
        if (!this.props._id) {
            return {
                ready: true,
                character: Character.getEmptyJSON()
            };
        }
        const sub = Meteor.subscribe("character", this.props._id);

        return {
            ready: sub.ready(),
            character: Character.find(this.props._id)
        };    },

    render() {
        if (this.data.ready) {
            return (
                <span>{this.data.character.name}</span>
            );
        }
        else {
            return <span>loading</span>
        }

    }
});