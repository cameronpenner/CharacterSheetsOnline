const {
    Router,
    Route,
    IndexRoute
} = ReactRouter;

const createHistory = ReactRouter.history.createHistory;

const routes = (
    <Route path="/" component={AppBody}>
        <IndexRoute component={Character.list} />
        <Route path="character/new" component={Character.edit} />
    </Route>
);

const router = (
    <Router history={createHistory()}>
        {routes}
    </Router>
);

Meteor.startup(function () {
    ReactDOM.render(router, document.getElementById("app-container"));
});