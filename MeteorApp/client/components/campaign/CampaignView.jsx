CampaignView = React.createClass({

	getInitialState() {
		return({editing: false, canEdit: false});
	},

	componentDidMount() {
		var self = this;
		Meteor.call("canEdit", this.props.campaign, function(err, data) {
			if (data === true) {
				self.enableEditing();
			}
		});
	},

	render() {
		return(
			<div>
			{this.state.canEdit ? 
				<button type="button" className={"btn pull-right " + (this.state.editing ? "btn-primary" : "btn-default")} onClick={this.startEditing}><span className="glyphicon glyphicon-pencil"></span></button> 
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
				</div>}
			</div>
		);
	},

	enableEditing() {
		this.setState({canEdit: true});
		this.backup = jQuery.extend(true, {}, this.props.campaign);
	},

	startEditing() {
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

	removePlayer(player) {
		this.props.campaign.players.splice(this.props.campaign.players.indexOf(player), 1);
		this.setState({});
	},

	save() {
		console.log("Save");
		this.props.campaign.name = this.refs.name.value;
		this.setState({editing: false});
		Meteor.call("upsertCampaign", this.props.campaign);
	}

});