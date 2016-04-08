CharacterView = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            editing: false,
            renderOneEdit: false,
            error: null
        };
    },

    getMeteorData() {
        if (!this.props.routeParams._id) return {};
        var _id = this.props.routeParams._id;

        const charSub = Meteor.subscribe("character", _id);
        const itemSub = Meteor.subscribe('item-list');
        const attrSub = Meteor.subscribe('attribute-list');
        const campSub = Meteor.subscribe('campaign-list-character', _id);
        const imgsSub = Meteor.subscribe('images');

        var data = {
            ready: charSub.ready(),
            itemReady: itemSub.ready(),
            attrReady: attrSub.ready(),
            character: Characters.findOne(_id),
            user: Meteor.user(),
            canEdit: false,
            campaigns:[]
        };
        data.campaigns = Campaigns.find({character_ids: {$in: [_id]}}).fetch();

        if(data.character && data.user){
            if((data.character.owner == data.user._id)){
                data.canEdit = true;
            }
            else {
                for(i = 0; i < data.campaigns.length; i++){
                    if(data.user.username == data.campaigns[i].game_master_name){
                        data.canEdit = true;
                    }
                }
            }
        }
        return data;
    },

    setError(error) {
        this.setState({
            error: error
        });
    },

    checkEditingState(str) {
        return this.state.renderOneEdit == false &&
            this.state.editing == str;
    },

    setEditingState(event) {
        event.preventDefault();

        if(this.data.canEdit){
            this.setState({
                editing: event.target.textContent,
                renderOneEdit: false,
                error: null
            });
        }
    },

    setEditingStateName(event) {
        event.preventDefault();

        this.setState({
            editing: this.data.character.name,
            renderOneEdit: false,
            error: null
        });
    },

    save(event) {
        event.preventDefault();
        var value = event.target.parentNode.previousSibling.value,
            id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.character;

        if (value.length == 0) {
            this.setError({reason:"A value is required"});
            this.state.renderOneEdit = false;
        }
        else {
            console.log("else not setError");
            this.setError(null);
            switch (name) {
                case "New Attribute":
                    Meteor.call("addCharacterAttribute", c._id, {name: value});
                    break;
                case "Attribute":
                    attribute = Attributes.findOne(id);
                    attribute.name = value;
                    Meteor.call("upsertAttribute", attribute);
                    break;
                case "New Item":
                    Meteor.call("addCharacterItem", c._id, {name: value});
                    break;
                case "Item":
                    item = Items.findOne(id);
                    item.name = value;
                    Meteor.call("upsertItem", item);
                    break;
                case "Name":
                    c.name = value;
                    Meteor.call("upsertCharacter", c);
                    break;
                default:
                    console.log("default case");
            }

            //return to just viewing
            this.cancelEdit();
        }
    },

    delete(event) {
        event.preventDefault();
        var id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.character;
        switch (name) {
            case "Attribute":
                Meteor.call("removeCharacterAttribute", c._id, id);
                break;
            case "Item":
                Meteor.call("removeCharacterItem", c._id, id);
                break;
            default:
                console.log("default case");
        }

        //return to just viewing
        this.cancelEdit();    
    },

    cancelEdit(event) {
        if (event) event.preventDefault();
        this.setState(this.getInitialState());
    },

    deleteAll(){
        console.log("Deleting all");
        c = this.data.character;

        Meteor.call("removeAll", c._id);

        console.log("FinishedDeleting");
    },

    renderForm(name, value, key) {
        if (!this.state.renderOneEdit) {
            this.state.renderOneEdit = true;

            //can't delete the name
            var deleteFunc = null;
            if (this.state.editing != "Name: " && this.state.editing != this.data.character.name) {
                deleteFunc = this.delete;
            }

            var tempID = new Mongo.ObjectID();
            return (
                <li key={tempID._str}
                    className="list-group-item">
                    {this.state.error ? <div className="alert alert-danger" role="alert">Error: {this.state.error.reason}</div> : ''}
                    <Form tempID={tempID._str}
                          name={name}
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

    deleteCharacter(event) {
        this.deleteAll();//all data is deleted
        Meteor.call("removeCharacter", this.data.character);
        //navigate to the character list.
    },

    displayItem(id) {
        item = Items.findOne(id);
        return item.name;
    },

    displayAttribute(id) {
        attribute = Attributes.findOne(id);
        return attribute.name;
    },

    render() {
        if (this.data.ready) {
            if (this.data.character){
                return (
                    <Fader>
                        <a href={"/character/list/"}>
                            <button type="button"
                                className="btn btn-primary btn-block">Return to Character List</button></a>
                        &emsp;
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-2">
                                        <h3><img className="img-responsive center-block" src={this.data.character.img_path}/></h3>
                                    </div>

                                    <div className="col-xs-5">
                                        {this.data.canEdit ? <div>
                                            {this.checkEditingState("Name: ") || this.checkEditingState(this.data.character.name) ?
                                                this.renderForm("Name", this.data.character.name) :
                                                <h2>Name: {this.data.character.name}&nbsp;
                                                    <button type="button"
                                                        className="btn btn-default"
                                                        onClick={this.setEditingStateName}>Edit</button>
                                                </h2>
                                            }</div>: <h2>Name: {this.data.character.name}</h2>}
                                    </div>

                                    <div className="col-xs-5 text-right">
                                        <h2>Owner: {this.data.character.owner_name}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h3>Attributes</h3>
                                        <div className="list-group">
                                            {_.map(this.data.character.attributes, function (attribute) {
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
                                                    return (<li className="list-group-item"
                                                                key={attribute}
                                                                onClick={this.setEditingState}><LoadingImage/></li>);
                                                }
                                            }, this)}
                                        </div>
                                        {this.checkEditingState("New Attribute") ?
                                            this.renderForm("New Attribute", "") : <div>
                                            {this.data.canEdit ?
                                                <button type="button"
                                                        className="btn btn-primary"
                                                        onClick={this.setEditingState}>New Attribute</button> : <div></div>} </div>

                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h3>Items</h3>
                                        <div className="list-group">
                                            {_.map(this.data.character.items, function (item) {
                                                if(this.data.itemReady){
                                                    return (
                                                        <a className="list-group-item"
                                                           key={item}
                                                           href={this.data.character._id+"/item/"+item}>{this.displayItem(item)}</a>
                                                    );

                                                }
                                                else {
                                                    return (<li className="list-group-item"
                                                                key={item}
                                                                onClick={this.setEditingState}><LoadingImage/></li>);
                                                }
                                            }, this)}
                                        </div>
                                        {this.checkEditingState("New Item") ?
                                            this.renderForm("New Item", "") : <div>
                                            {this.data.canEdit ?
                                                <button type="button"
                                                        className="btn btn-primary"
                                                        onClick={this.setEditingState}>New Item</button> : <div></div>} </div>
                                        }
                                    </div>
                                </div>
                            </div>



                            <div className="panel-footer">
                                    {this.data.canEdit ?
                                        <button type="button"
                                                className="btn btn-danger"
                                                href={"/"}
                                                onClick={this.deleteCharacter}>Delete Character</button> : <div></div>}
                            </div>
                        </div>
                    </Fader>
                );
            }
            else {
                return (
                    <Fader>
                        <h3>No valid character found</h3>
                        <a style={{color:'black',textDecoration:'none'}}
                            href={"/character/list/"}>
                                <button type="button"
                                        className= "btn btn-default">Return to Character List</button></a>
                    </Fader>
                    );
            }
        }
        else {
            return <LoadingImage/>;
        }
    }
});
