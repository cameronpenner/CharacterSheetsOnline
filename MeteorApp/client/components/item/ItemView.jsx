ItemView = React.createClass({
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
        var _id = this.props.routeParams._id[1];
            character_id = this.props.routeParams._id[0]

        const sub = Meteor.subscribe("item", _id);
        const attrSub = Meteor.subscribe('attribute-list');
        const charSub = Meteor.subscribe("character", character_id);
        const campSub = Meteor.subscribe('campaign-list-character', character_id);
        const charsSub = Meteor.subscribe('all-character-list');

        var data = {
            ready: sub.ready(),
            attrReady: attrSub.ready(),
            charReady: charSub.ready(),
            campReady: campSub.ready(),
            charsReady: charsSub.ready(),
            character: Characters.findOne(character_id),
            item: Items.findOne(_id),
            user: Meteor.user(),
            canEdit: false,
            attributes: [],
            campaigns:[]
        };

        if (data.item && data.item.attributes) {
            data.attributes = Attributes.find({_id: {$in: data.item.attributes}}).fetch();
        }
        data.campaigns = Campaigns.find({character_ids: {$in: [character_id]}}).fetch();

        if(data.character && data.user){
            if((data.character.owner == data.user._id)){
                data.canEdit = true;
            }
            else {
                for(i = 0; i < data.campaigns.length; i++){
                    if(data.user._id == data.campaigns[i].game_master){
                        data.canEdit = true;
                    }
                }
            }
        }

        return data;
    },

    setError(error) {
        this.setState({error: error});
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

        if(this.data.canEdit){
            this.setState({
                editing: this.data.item.name,
                renderOneEdit: false,
                error: null
            });
        }
    },

    save(event) {
        event.preventDefault();
        var value = event.target.parentNode.previousSibling.value,
            id = $(event.target.parentNode.previousSibling).attr("id"),
            name = $(event.target.parentNode.previousSibling).attr("label"),
            c = this.data.item;


        if (value.length == 0) {
            this.setError({reason: "A value is required"});
            this.state.renderOneEdit = false;
        }
        else {
            switch (name) {
                case "New Attribute":
                    Meteor.call("addItemAttribute", c._id, {name: value});
                    break;
                case "Attribute":
                    attribute = Attributes.findOne(id);
                    attribute.name = value;
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
        }


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
        this.setState(this.getInitialState());
    },

    deleteItem(event) {
        c = this.data.character;
        Meteor.call("removeCharacterItem", c._id, this.data.item._id);
    },

    giveItem(event) {
        var char2_id = $(event.target).attr("label");
        character = Characters.findOne(char2_id);
        console.log(character_id);
        console.log("gives to");
        console.log(char2_id);

        Meteor.call("swapItems", character_id, char2_id, this.data.item._id);
    },

    characterOwnsItem(event){
        cha = this.data.character;
        bool = false;
        for(i = 0; i < cha.items.length; i++){
            if(cha.items[i] == this.data.item._id) {
                bool = true;
            }
        }
        return bool;
    },

    giveApplicable() {
        // check if there are other characters in the campaign the this character is in
        if (this.data.campaigns.length > 0) {
            for (i=0; i<this.data.campaigns.length; i++) {
                if (this.data.campaigns[i] && this.data.campaigns[i].character_ids.length>1)
                    return true;
            }
        }

        return false;

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
                    {this.state.error ? <div className="alert alert-danger" role="alert">Error: {this.state.error.reason}</div> : ''}
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

    render() {
        if (this.data.ready && this.data.charReady && this.data.campReady) {
            if (this.data.item && this.characterOwnsItem()) {
                return (
                    <Fader>
                        <a href={"/character/"+this.data.character._id}>
                            <button type="button"
                                className="btn btn-primary btn-block">Return to Character</button></a>
                        &emsp;

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="row">

                                    <div className="col-xs-6">
                                        {this.data.canEdit ? <div>
                                            {this.checkEditingState("Name: ") || this.checkEditingState(this.data.item.name) ?
                                                this.renderForm("Name", this.data.item.name) :
                                                <h2>Name: {this.data.item.name}&nbsp;
                                                    <button type="button"
                                                        className="btn btn-default"
                                                        onClick={this.setEditingStateName}>Edit</button>
                                                </h2>
                                            }</div>: <h2>Name: {this.data.item.name}</h2>}
                                    </div>

                                    <div className="col-xs-6 text-right">
                                        <h2>Owner: {this.data.character.name}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h3>Attributes</h3>
                                        <div className="list-group">
                                            {this.data.attrReady ?
                                                _.map(this.data.attributes, function(attribute) {
                                                    if (this.checkEditingState(attribute.name)) {
                                                        return this.renderForm("Attribute", attribute.name, attribute._id);
                                                    }
                                                    else {
                                                        return (
                                                            <li className="list-group-item"
                                                                key={attribute._id}
                                                                onClick={this.setEditingState}>{attribute.name}</li>
                                                        );
                                                    }
                                                }, this) : <LoadingImage/>
                                            }
                                        </div>
                                        {this.checkEditingState("New Attribute") ?
                                            this.renderForm("New Attribute", "") : <div>
                                            {this.data.canEdit ?
                                                <button type="button"
                                                        className="btn btn-primary"
                                                        onClick={this.setEditingState}>New Attribute</button> : <div></div>} </div>

                                        }
                                    </div>
                                    &emsp;
                                    <div className="col-xs-12">
                                    {this.data.canEdit && this.giveApplicable() ?
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" 
                                                    type="button" 
                                                    id="menu1" 
                                                    data-toggle="dropdown">Give
                                            <span className="caret"></span></button>
                                            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                                {this.data.campReady && (this.data.campaigns.length != 0) ? 
                                                    _.map(this.data.campaigns, function(campaign) {
                                                        return (
                                                            _.map(campaign.character_ids, function(char_id) {
                                                                character = Characters.findOne(char_id);
                                                                if(character && (char_id != character_id)){
                                                                    return <li role="presentation"><a role="menuitem" 
                                                                                               tabIndex="-1"
                                                                                               label = {char_id}
                                                                                               href={"/character/"+this.data.character._id}
                                                                                               onClick={this.giveItem}>{character.name}</a></li>
                                                                }
                                                            }, this)
                                                        );
                                                    }, this) : <li role="presentation"><a role="menuitem" 
                                                                                               tabIndex="-1"
                                                                                               label = "Loading..."><LoadingImage/></a></li>
                                                }
                                            </ul>  
                                        </div>: <div/>}
                                    </div>
                                </div>
                            </div>



                            <div className="panel-footer">
                                {this.data.canEdit ?
                                    <button type="button"
                                            className="btn btn-danger"
                                            onClick={this.deleteItem}>Delete Item</button> : <div></div>}
                            </div>
                        </div>
                    </Fader>
                );
            }
            else {
                return (
                    <Fader>
                        <h3>No valid item found</h3>
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
