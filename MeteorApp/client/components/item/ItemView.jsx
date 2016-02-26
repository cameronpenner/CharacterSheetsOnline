ItemView = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            editing: false,
            renderOneEdit: false
        };
    },

    getMeteorData() {
        if (!this.props.routeParams._id) return {};
        var _id = this.props.routeParams._id[1];
            c_id = this.props.routeParams._id[0]

        const sub = Meteor.subscribe("item", _id);
        const attrSub = Meteor.subscribe('attribute-list');
        const charSub = Meteor.subscribe("character", c_id);

        return {
            ready: sub.ready(),
            attrReady: attrSub.ready(),
            charReady: charSub.ready(),
            character: Characters.findOne(c_id),
            item: Items.findOne(_id)
        };
    },

    checkEditingState(str) {
        return this.state.renderOneEdit == false &&
            this.state.editing == str;
    },

    setEditingState(event) {
        event.preventDefault();
        this.setState({
            editing: event.target.textContent,
            renderOneEdit: false
        });
    },

    save(event) {
        event.preventDefault();
        var value = event.target.parentNode.previousSibling.value,
            id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.item;
        if (value.length == 0) return; // or maybe throw an error?
        switch (name) {
            case "New Attribute":
                Meteor.call("addItemAttribute", c._id, {name: value});
                break;
            case "Attribute":
                console.log(id);
                attribute = Attributes.findOne(id);
                console.log(attribute);
                attribute.name = value;
                console.log(attribute);
                Meteor.call("upsertAttribute", attribute);
                Meteor.call("upsertItem", c);
                break;
            case "Name":
                c.name = value;
                Meteor.call("upsertItem", c);
                break;
            default:
                console.log("default case");
        }

        //return to just viewing
        this.cancelEdit();
    },

    delete(event) {
        event.preventDefault();
        var id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.item;
        switch (name) {
            case "Attribute":
                Meteor.call("removeItemAttribute", c._id, id);
                break;
            default:
                console.log("default case");
        }

        //return to just viewing
        this.cancelEdit();    
    },

    cancelEdit(event) {
        if (event) event.preventDefault();
        this.setState({
            editing: false,
            renderOneEdit: false
        })
    },

    renderForm(name, value, key) {
        if (!this.state.renderOneEdit) {
            this.state.renderOneEdit = true;

            //can't delete the name
            var deleteFunc = null;
            if (this.state.editing != "Name: " && this.state.editing != this.data.item.name) {
                deleteFunc = this.delete;
            }

            return (
                <li key={name}
                    className="list-group-item">
                    <Form name={name}
                          value={value}
                          id={key}
                          save={this.save}
                          delete={deleteFunc}
                          cancel={this.cancelEdit}/>
                </li>
            );
        }
        else {
            return <div onClick={this.cancelEdit}>Error Rendering Form...</div>;
        }
    },

    displayAttribute(id) {
        attribute = Attributes.findOne(id);
        console.log(id);
        console.log(attribute);
        return attribute.name;
    },

    render() {
        if (this.data.ready) {
            return (
                <div className="container">
                    {this.checkEditingState("Name: ") || this.checkEditingState(this.data.item.name) ?
                        this.renderForm("Name", this.data.item.name) :
                        <h2 onClick={this.setEditingState}>Item: {this.data.item.name}</h2>
                    }

                    {this.data.charReady ? <a style={{color:'black',textDecoration:'none'}}
                                                href={"/character/"+this.data.character._id}><h4>Owner: {this.data.character.name}</h4></a> : <h4>Loading</h4>}

                    <h3>Attributes</h3>
                    <div className="list-group">
                        {_.map(this.data.item.attributes, function (attribute) {
                            if(this.data.attrReady){
                                if (this.checkEditingState(this.displayAttribute(attribute))) {
                                    return this.renderForm("Attribute", this.displayAttribute(attribute), attribute)
                                }
                                else {
                                    return (
                                        <li className="list-group-item"
                                            key={attribute}
                                            onClick={this.setEditingState}>{this.displayAttribute(attribute)}</li>
                                    );
                                }
                            }
                            else {
                                <li className="list-group-item"
                                            key={attribute}
                                            onClick={this.setEditingState}>loading...</li>
                            }
                        }, this)}
                    </div>
                    {this.checkEditingState("New Attribute") ?
                        this.renderForm("New Attribute", "") :
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.setEditingState}>New Attribute</button>
                    }
                </div>
            );
        }
        else {
            return <div>loading</div>;
        }
    }
});
