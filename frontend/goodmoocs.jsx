var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var React = require('react');
var ReactDOM = require('react-dom');

var CourseIndex = require('./components/course/CourseIndex');
var CourseShow = require('./components/course/CourseShow');
var CurrentUserStore = require('./stores/currentUser');
var SessionsApiUtil = require('./util/sessions_api_util');

var ReviewForm = require('./components/review/ReviewForm');
var SessionForm = require('./components/sessions/new');
var UserForm = require('./components/users/Form');

var App = React.createClass({
  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    return (
      <div>
        <h1>the app render</h1>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ CourseIndex } onEnter={ _ensureLoggedIn }/>
    <Route path="courses/:courseId" component={ CourseShow }>
      <Route path="review/:reviewId" components={ ReviewForm }/>
    </Route>
    <Route path="login" component={ SessionForm }/>
    <Route path="users/new" component={ UserForm } />
  </Route>
);
// make `_ensureLoggedIn` the `onEnter` prop of
// routes that requires User Auth (see line 17)
function _ensureLoggedIn(nextState, replace, callback) {
  // the third `callback` arg allows us to do async
  // operations before the route runs. Router will wait
  // for us to call it before actually routing
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn(); // this function below
  } else {
    // currentUser has not been fetched
    // lets fetch them and then see if
    // we have to redirect or not
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
}

$(function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
