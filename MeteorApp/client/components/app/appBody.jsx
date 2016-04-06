AppBody = React.createClass({
    mixins:[ReactMeteorData],

    getInitialState() {
        return {
            die: "20",
            roll: "20"
        };
    },

    getMeteorData() {
        return {
            user: Meteor.user(),
        };
    },

    logout() {
        Meteor.logout();
    },

    setD4() {
        this.state.die = "4";
        this.state.roll = "4";
    },

    setD6() {
        this.state.die = "6";
        this.state.roll = "6";
    },

    setD8() {
        this.state.die = "8";
        this.state.roll = "8";
    },

    setD10() {
        this.state.die = "10";
        this.state.roll = "10";
    },

    setD12() {
        this.state.die = "12";
        this.state.roll = "12";
    },

    setD20() {
        this.state.die = "20";
        this.state.roll = "20";
    },

    rollDie() {
        this.setState({
            roll: Math.ceil(Math.random() * this.state.die)
        });
    },

    render() {
        var string = "/Dice/D" + this.state.die + "/" + this.state.roll + ".jpg";
        return (
            <div className="container">
                <header>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">RPG Companion</a>
                            </div>
                            {this.data.user != null ?
                                <div>
                                    <ul className="nav navbar-nav">
                                        <li><a href="/character/list">Characters</a></li>
                                        <li><a href="/campaign/list">Campaigns</a></li>
                                        <li><a href="#" data-toggle="modal" data-target="#diceModal">Dice</a></li>
                                    </ul>
                                    <u1 className="nav navbar-nav navbar-right">
                                        <li><a href="#" onClick={this.logout}>Logout</a></li>
                                    </u1>
                                </div>
                                : ''
                            }
                        </div>
                    </nav>
                </header>
                <div className="row">
                    <div className="col-lg-12">
                        {this.data.user === null ? <SignIn/> : this.props.children}
                    </div>
                </div>

                <div id="diceModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">D{this.state.die}

                                    <button className="btn btn-default dropdown-toggle pull-right"
                                            type="button"
                                            id="menu1"
                                            data-toggle="dropdown">Choose A Die
                                    <span className="caret"></span></button>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                        <li role="presentation"><a role="menuitem"
                                                                    tabindex="-1"
                                                                    label = "4"
                                                                    href = "#"
                                                                    onClick={this.setD4}>D4</a></li>
                                        <li role="presentation"><a role="menuitem"
                                                                    tabindex="-1"
                                                                    label = "6"
                                                                    href = "#"
                                                                    onClick={this.setD6}>D6</a></li>
                                        <li role="presentation"><a role="menuitem"
                                                                    tabindex="-1"
                                                                    label = "8"
                                                                    href = "#"
                                                                    onClick={this.setD8}>D8</a></li>
                                        <li role="presentation"><a role="menuitem"
                                                                    tabindex="-1"
                                                                    label = "10"
                                                                    href = "#"
                                                                    onClick={this.setD10}>D10</a></li>
                                        <li role="presentation"><a role="menuitem"
                                                                    tabindex="-1"
                                                                    label = "12"
                                                                    href = "#"
                                                                    onClick={this.setD12}>D12</a></li>
                                        <li role="presentation"><a role="menuitem"
                                                                    tabindex="-1"
                                                                    label = "20"
                                                                    href = "#"
                                                                    onClick={this.setD20}>D20</a></li>
                                    </ul>

                                </h3>
                            </div>
                            <div className="modal-body">
                                <img src={string}/>
                                <button type="button"
                                    className="btn btn-default"
                                    onClick={this.rollDie}>Roll</button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
});