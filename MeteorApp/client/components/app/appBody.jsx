AppBody = React.createClass({
    mixins:[ReactMeteorData],

    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    logout() {
        Meteor.logout();
    },

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">
                                    <img src="/images/crctrz.png"/>
                                </a>
                            </div>
                            {this.data.user != null ?
                                <div>
                                    <ul className="nav navbar-nav">
                                        <li><a href="/character/list">Characters</a></li>
                                        <li><a href="/campaign/list">Campaigns</a></li>
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
                <div className="container-fluid" id="main">
                    <div className="row">
                        <div className="col-xs-12">
                            {this.data.user === null ? <SignIn/> : <div>
                                {this.props.children ? <div className="row">
                                    <div className="col-xs-6 col-xs-offset-3">{this.props.children}</div>
                                </div> : <Fader>
                                    <h1 className="text-center">Welcome to</h1>
                                    <img src="/images/crctrzbig2.png" />
                                </Fader>}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});