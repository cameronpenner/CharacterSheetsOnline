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
                    <div className="nav">
                        {this.data.user ?
                            <ul className="nav navbar-nav">
                                <li><a href="/">Home</a></li>
                                <li><a href="/character/list">Character List</a></li>
                                <li><a href="/character/new">New Character</a></li>
                                <li><a href="/campaign/list">Campaign List</a></li>
                                <li><a href="/campaign/new">New Campaign</a></li>
                                <li><a href="#" onClick={this.logout}>Logout</a></li>
                            </ul>
                            : ''
                        }
                    </div>
                </header>
                <h1>RPG Companion</h1>
                {this.data.user ? this.props.children : <SignIn/>}

            </div>
        );
    }
});