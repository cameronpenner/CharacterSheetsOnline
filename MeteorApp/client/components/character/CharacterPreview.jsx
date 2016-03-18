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
        const sub = Meteor.subscribe("character", this.props._id);

        return {
            ready: sub.ready(),
            character: Characters.findOne(this.props._id)
        };
    },

    render() {
        if (this.data.ready) {
            return (
                <span><img src={this.data.character.img_path}/> {this.data.character.name}</span>
            );
        }
        else {
            return <LoadingImage/>
        }

    }
});