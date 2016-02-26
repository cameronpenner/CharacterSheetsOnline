CampaignView = React.createClass({

	getInitialState() {
		return({editing: false, canEdit: false, playerBackup: [], characterLookup: {}});
	},

	componentDidMount() {
		var self = this;
		Meteor.call("canEdit", this.props.campaign, function(err, data) {
			if (data === true) {
				self.enableEditing();
			}
		});

		this.fillCharacterLookup();
	},

	render() {
		return(
			<div>
			{this.state.canEdit ? 
				<button type="button" className={"btn pull-right " + (this.state.editing ? "btn-primary" : "btn-default")} onClick={this.toggleEditing}><span className="glyphicon glyphicon-pencil"></span></button> 
			: 
				""}

			{this.state.editing ? 
				<form>
				<input type="text" ref="name" className="form-control" defaultValue={this.props.campaign.name}/>
				<button type="button" className="btn btn-success" onClick={this.save}><span className="glyphicon glyphicon-ok"></span></button> 
				<div className ="list-group">
					{this.props.campaign.players.map((player) => {
						return <div className="list-group-item">{player} <button className="btn pull-right btn-xs btn-default" type="button" onClick={this.removePlayer.bind(this, player)}><span className="glyphicon glyphicon-remove"></span></button></div>;
					})}
				</div>

				<div className="input-group">
					<input type="text" className="form-control" placeholder="Add player..." ref="newplayer" />
					<span className="input-group-btn">
						<button className="btn btn-default" type="button" onClick={this.addPlayer}>Add</button>
					</span>

				</div>

				<h4>Game master:</h4>
				<select className="form-control" ref="gamemaster">
					<option>{this.props.campaign.game_master_name}</option>
					{this.props.campaign.players.map((player) => {
						return <option>{player}</option>;
					})}
				</select>

				</form>
			: 
				<div>
					<h3>{this.props.campaign.name}</h3>
					<h4>Game master: {this.props.campaign.game_master_name}</h4>
					<h4>Players</h4>
					<ul className="list-group">
						{this.props.campaign.players.map((player) => {
							return <li className="list-group-item">{player}</li>;
						})}
					</ul>
					<h4>Characters</h4>
					<ul className="list-group">
						{this.props.campaign.characters.map((character) => {
							var canEdit = false;
							this.props.characters.filter(function(curr) {
								if (curr._id === character) {
									canEdit = true;
								}
							});
							if (canEdit) {
								return (
									<li className="list-group-item"><a href={"/character/" + character}>{this.state.characterLookup[character] ? this.state.characterLookup[character].name : "loading..."}</a><button className="btn btn-xs btn-default pull-right" onClick={this.removeCharacter.bind(this, character)}><span className="glyphicon glyphicon-remove"></span></button></li>
								);
							} else {
								return (
									<li className="list-group-item">{this.state.characterLookup[character] ? this.state.characterLookup[character].name : "loading..."}</li>
								);
							}
							
						})}
					</ul>
					<h4>Add Character</h4>
					<div className="input-group">
						<select className="form-control" ref="addcharacter">
							{this.props.characters.map((character) => {
								if (this.props.campaign.characters.indexOf(character._id) == -1) {
									return <option>{character.name}</option>
								} else {
									return null;
								}
							})}
						</select>
						<span className="input-group-btn">
							<button className="btn btn-default" type="button" onClick={this.addCharacter}><span className="glyphicon glyphicon-plus"></span></button>
						</span>
					</div>
				</div>}
			</div>
		);
	},

	enableEditing() {
		this.setState({canEdit: true});
	},

	toggleEditing() {
		if (!this.state.editing) { // editing is about to start
			this.setState({playerBackup: this.props.campaign.players});
			console.log(this.state.playerBackup);
		} else { // editing is done but not saved
			console.log(this.state.playerBackup);
			this.props.campaign.players = this.state.playerBackup;
		}
		this.setState({editing: !this.state.editing});
	},

	addPlayer() {
		var self = this;
		Meteor.call("playerExists", this.refs.newplayer.value, function(err, data) {
			if (data === true) {
				self.props.campaign.players.push(self.refs.newplayer.value);
				self.refs.newplayer.value = "";
				ReactDOM.findDOMNode(self.refs.newplayer).className += " has-success";
			} else {
				alert("Player does not exist.");
			}
			self.setState({});
		});
	},

	addCharacter() {
		this.props.campaign.characters.push(this.props.characters[this.refs.addcharacter.selectedIndex]._id);
		jQuery.unique(this.props.campaign.characters);
		Meteor.call("upsertCampaign", this.props.campaign);
		this.fillCharacterLookup();
	},

	removeCharacter(character) {
		this.props.campaign.characters.splice(this.props.campaign.characters.indexOf(character._id), 1);
		Meteor.call("upsertCampaign", this.props.campaign);
		this.fillCharacterLookup();
	},

	removePlayer(player) {
		this.props.campaign.players.splice(this.props.campaign.players.indexOf(player), 1);
		this.setState({});
	},

	save() {
		this.props.campaign.name = this.refs.name.value;
		this.props.game_master_name = this.refs.gamemaster.value;
		this.setState({editing: false});
		Meteor.call("upsertCampaign", this.props.campaign);
	},

	fillCharacterLookup() {
		var self = this;
		this.props.campaign.characters.map((character) => {
			Meteor.call("getCharacter", character, function(err, data) {
				characterLookup = self.state.characterLookup;
				characterLookup[character] = data;
				self.setState({characteLookup: characterLookup});
			});
		});
	}
});