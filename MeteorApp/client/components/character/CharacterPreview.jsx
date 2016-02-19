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
        return {};//Character.find(this.props._id);
    },

    render() {
        return (
            <a href={this.props.path}>Character Preview _id: {this.props._id}</a>
        );
    }
});