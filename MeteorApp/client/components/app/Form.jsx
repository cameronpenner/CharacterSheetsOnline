Form = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        save: React.PropTypes.func,
        delete: React.PropTypes.func,
        cancel: React.PropTypes.func
    },

    getInitialState() {
        return {
            value: this.props.value
        }
    },

    handleChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    },

    render() {
        return (
            <div className="input-group">
                <div className="input-group">
                    <input id={this.props.name}
                           className="form-control"
                           type="text"
                           ref={this.props.name}
                           placeholder={this.props.name}
                           value={this.state.value}
                           onChange={this.handleChange} />
                    <div className="input-group-btn">
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.props.save}>Save</button>
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.props.delete}>Delete (not implemented yet)</button>
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.props.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
});