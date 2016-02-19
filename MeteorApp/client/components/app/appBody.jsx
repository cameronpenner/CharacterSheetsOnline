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
                            {this.data.user ?
                                <div>
                                    <ul className="nav navbar-nav">
                                        <li><a href="/character/list">Character List</a></li>
                                        <li><a href="/character/new">New Character</a></li>
                                        <li><a href="/campaign/list">Campaign List</a></li>
                                        <li><a href="/campaign/new">New Campaign</a></li>
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
                {this.data.user ? this.props.children : <SignIn/>}
            </div>
        );
    }
});