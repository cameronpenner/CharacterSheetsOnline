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
                        {this.props.save ? <button type="button"
                                                   className="btn btn-default"
                                                   onClick={this.props.save}>Save</button> : ''}
                        {this.props.delete ? <button type="button"
                                                     className="btn btn-default"
                                                     onClick={this.props.delete}>Delete</button> : ''}
                        {this.props.cancel ? <button type="button"
                                                     className="btn btn-default"
                                                     onClick={this.props.cancel}>Cancel</button> : ''}
                    </div>
                </div>
            </div>
        );
    }
});