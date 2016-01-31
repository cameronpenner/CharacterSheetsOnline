AppBody = React.createClass({
    render() {
        return (
            <div className="container">
                <header>
                    <h1>RPG Companion</h1>
                    <AccountsUIWrapper />
                </header>
                <div id="content-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
