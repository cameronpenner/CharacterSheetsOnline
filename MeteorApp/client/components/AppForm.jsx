AppForm = React.createClass({
    propTypes: {
        startOnEdit: React.PropTypes.bool,
        values: React.PropTypes.array,
        object: React.PropTypes.object,
        upsertMethod: React.PropTypes.func,
        removeMethod: React.PropTypes.func
    },
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            editing: this.props.startOnEdit
        }
    },

    getMeteorData() {
        return {};
    },

    toggleEdit(event) {
        if (event) event.preventDefault();
        this.setState({
            editing: !this.state.editing
        })
    },

    onChange(event) {
        event.preventDefault();
        console.log("on change", event);
        //how to handle changes?
    },

    save(event) {
        event.preventDefault();
        console.log("save", event);
        this.props.upsertMethod(this.props.object, "newname");
        this.toggleEdit();
    },

    remove(event) {
        event.preventDefault();
        console.log("remove", event);
        this.props.removeMethod(this.props.object);
        //how to remove?
    },

    renderFields() {
        return this.props.values.map((thing, i) => {
            console.log(thing, i);
            return (
                <field key={i}>
                    <label>{thing.label}</label>
                    <input type="text" value={thing.value} onChange={this.onChange} />
                </field>
            )
        });
    },

    renderForm() {
        return (
            <form>
                {this.renderFields()}
                <button onClick={this.save}>Save</button>
                <button onClick={this.remove}>Remove</button>
                <button onClick={this.toggleEdit}>Close</button>
            </form>
        );
    },

    renderChildren() {
        return (
            <div onClick={this.toggleEdit}>{this.props.children}</div>
        )
    },

    render() {
        return (
            <div id={this.props.key}>
                {this.state.editing ? this.renderForm() : this.renderChildren()}
            </div>
        )
    }
});
