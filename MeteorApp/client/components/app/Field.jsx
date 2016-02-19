Field = React.createClass({
    propTypes: {
        startOnEdit: React.PropTypes.bool,
        id: React.PropTypes.string,
        label: React.PropTypes.string,
        value: React.PropTypes.string,
        changeFunc: React.PropTypes.func
    },

    getInitialState() {
        return {
            editing: this.props.startOnEdit,
            value: this.props.value
        };
    },

    toggleEdit() {
        this.setState({
            editing: !this.state.editing
        });
    },

    onChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
        this.props.changeFunc(this.props.label, this.state.value);
    },

    render() {
        return (
            <div className="Field Field">
                {this.state.editing
                    ? <field>
                        <label>{this.props.label}</label>
                        {parseInt(this.state.value)
                            ? <input type="number"
                                     value={parseInt(this.state.value)}
                                     onChange={this.onChange} />
                            : <input type="text"
                                     value={this.state.value}
                                     onChange={this.onChange} />
                        }
                    </field>
                    : <div onClick={this.toggleEdit}>
                        {this.props.label}: {this.state.value}
                    </div>
                }
            </div>
        );
    }
});