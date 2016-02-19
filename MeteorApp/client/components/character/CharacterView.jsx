CharacterView = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            modified: false,
            editing: null,
            fields: []
        };
    },

    getMeteorData() {
        var _id = this.props.routeParams._id;
        const sub = Meteor.subscribe("character", _id);

        return {
            ready: sub.ready(),
            character: Character.find(_id)
        };
    },

    setEdit(event) {
        event.preventDefault();
        console.log('setedit', event.target);
        this.setState({
            editing: event.target.id
        });
    },

    fieldChange(event) {
        event.preventDefault();
        console.log(event.target.value);
    },

    renderField(id, label, value) {
        return (
            <div key={id}>
                {this.state.editing == id
                    ? <field key={id}>
                        <label>{label}</label>
                        {parseInt(value)
                            ? <input id={id}
                                     type="number"
                                     value={parseInt(value)}
                                     onChange={this.onChange} />
                            : <input id={id}
                                     type="text"
                                     value={value}
                                     onChange={this.onChange} />
                        }
                    </field>
                    : <span onClick={this.setEdit} id={id}>{label}: {value}</span>
                }
            </div>
        );
    },

    renderFields(object) {
        var pairs = _.pairs(_.omit(object, '_id', 'owner', 'username', 'createdAt'));
        return _.map(pairs, function (pair, i) {
            if (!_.isObject(pair[1])) {
                var newKey = new Mongo.ObjectID(); //temporary id for editing

                this.state.fields.push({
                    key: newKey,
                    label:pair[0],
                    value: pair[1]
                });

                return this.renderField(newKey, pair[0], pair[1]);
                //return <Field
                //    key={i}
                //    startOnEdit={false}
                //    id={"hi"}
                //    label={pair[0]}
                //    value={pair[1]}
                //    changeFunc={this.fieldChange}
                ///>;
            }
            else {
                return _.map(pair[1], function (obj) {
                    return <span>{this.renderFields(obj)}</span>;
                }, this);
            }
        }, this);
    },

    render() {
        var pairs = _.pairs(_.omit(this.data.character, '_id', 'owner', 'username', 'createdat'));
        return (
            <div>
                {this.data.ready
                    ? <div className="character">
                    <h3>Character</h3>
                    {this.renderFields(_.pick(this.data.character, 'name'))}
                    <h4>Attributes</h4>
                    {this.renderFields(_.pick(this.data.character, 'attributes'))}
                    <button>Add Attribute</button>
                    <h4>Inventory</h4>
                    {
                        this.renderFields(_.pick(this.data.character, 'inventory'))
                    }
                    <button>Add Inventory</button>
                </div>
                    : "loading"
                }
            </div>
        );
    }
});