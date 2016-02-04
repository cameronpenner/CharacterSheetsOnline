AppBody = React.createClass({
    render() {
        return (
            <div className="container">
                <header>
                    <h1>KARCTURZ</h1>
                    <AccountsUIWrapper />
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/character/list">List</a></li>
                        <li><a href="/character/new">New</a></li>
                        <li><a href="/campaign/new">New Campaign</a></li>
                    </ul>
                </header>
                {this.props.children ? this.props.children : ''}
            </div>
        );
    }
});
