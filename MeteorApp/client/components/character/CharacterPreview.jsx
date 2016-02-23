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
        if (!this.props._id) return {};
        console.log(this.props._id);
        const sub = Meteor.subscribe("character", this.props._id);

        return {
            ready: sub.ready(),
            character: Characters.findOne(this.props._id)
        };
    },

    render() {
        if (this.data.ready) {
            console.log(this.data.character.name);
            return (
                <span>{this.data.character.name}</span>
            );
        }
        else {
            return <span>loading</span>
        }

    }
});