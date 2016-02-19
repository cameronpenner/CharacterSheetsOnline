AppForm = React.createClass({
    propTypes: {
        startOnEdit: React.PropTypes.bool,
        get: React.PropTypes.func,
        upsert: React.PropTypes.func,
        remove: React.PropTypes.func
    },
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            editing: this.props.startOnEdit,
            dataIsReady: false,
            fields: []
        };
    },

    getMeteorData() {
        var data = this.props.get(this.props._id);

        if (data.ready) {
            this.state.dataIsReady = true;
            this.state.fields = data.fields;
        }
        else {
            this.state.dataIsReady = false;
        }
        return {};
    },

    toggleEdit(event) {
        if (event) event.preventDefault();
        this.setState({
            editing: !this.state.editing
        });
    },

    save(event) {
        event.preventDefault();

        _.each(this.state.fields, function(field) {
            if (field.changed) {
                console.log(field.value);
                this.props.upsert(this.props.key, field.value);
            }
        }, this);

        this.toggleEdit();
    },

    remove(event) {
        event.preventDefault();
        console.log("remove", event);
        this.props.remove(this.props._id);
    },

    fieldChange(label, value) {
        console.log("in fieldchange");
        _.each(_.where(this.state.fields, {label: label}), function(field) {
            field.value = value;
            field.changed = true;
        }, this);
    },

    renderForm() {
        this.fieldChange("h", "h");
        return (
            <form>
                {this.state.fields.map(function(f, i) {
                    return (
                        <Field key={i}
                               label={f.label}
                               value={f.value}
                               changeFunc={this.fieldChange} />
                    )
                }, this)}
                <button onClick={this.save}>Save</button>
                <button onClick={this.remove}>Remove</button>
                <button onClick={this.toggleEdit}>Close</button>
            </form>
        );
    },

    render() {
        return (
            <div id={this.props.key}>
                {this.state.dataIsReady
                    ? <div>
                        {this.state.editing
                            ? this.renderForm()
                            : <div onClick={this.toggleEdit}>{this.props.children}</div>
                        }
                    </div>
                    : 'loading'
                }
            </div>
        )
    }
});
