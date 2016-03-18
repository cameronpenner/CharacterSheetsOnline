Fader = React.createClass({
    componentDidMount() {
        $('#fader').hide()
        $('#fader').fadeIn('slow')
    },
    render() {
        return (
            <div id="fader">
                {this.props.children}
            </div>
        )
    }
})