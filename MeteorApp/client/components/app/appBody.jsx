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
            </div>
        );
    }
});