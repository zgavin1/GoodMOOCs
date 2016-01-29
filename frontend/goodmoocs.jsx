var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var React = require('react');
var ReactDOM = require('react-dom');

var CourseIndex = require('./components/course/CourseIndex');
var CourseShow = require('./components/course/CourseShow');
var ReviewForm = require('./components/review/ReviewForm');
var CurrentUserStore = require('./stores/currentUserStore');
var SessionsApiUtil = require('./util/sessions_api_util');

var App = React.createClass({
  componentWillMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));

    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App } onEnter={ _ensureLoggedIn }>
    <IndexRoute component={ CourseIndex } onEnter={ _ensureLoggedIn }/>
    <Route path="courses/:courseId" component={ CourseShow }>
      <Route path="review/:reviewId" components={ ReviewForm }/>
    </Route>
  </Route>
);

$(function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});

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
    callback(); // Always call the callback.
                // The router doesn't actually run the
                // route until you do call it.
  }
}
