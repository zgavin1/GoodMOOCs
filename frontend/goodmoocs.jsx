var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var React = require('react');
var ReactDOM = require('react-dom');

var CourseIndex = require('./components/course/CourseIndex');
var CourseShow = require('./components/course/CourseShow');
var CourseSuggestions = require('./components/course/CourseSuggestions');
var CurrentUserStore = require('./stores/currentUser');
var SessionsApiUtil = require('./util/sessions_api_util');
var ReviewIndex = require('./components/review/ReviewIndex');
var Review = require('./components/review/Review');
var ReviewForm = require('./components/review/ReviewForm');

var SessionForm = require('./components/sessions/new');

var UserShow = require('./components/users/Show');
var NewUserForm = require('./components/users/Form');
var EditUserForm = require('./components/users/EditForm');
var UserIndex = require('./components/users/Index');

var Search = require('./components/Search');

var Header = require('./components/Header');
var Home = require('./components/Home');

var App = React.createClass({
  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
  },
// want to click anywhere on page to close dropdown menu
  // mainClick: function (e) {
  //   e.preventDefault();
  //   var undd = $('.user-nav-dropdown');
  //
  //   if (!undd.hasClass('hidden')) {
  //     undd.addClass('hidden');
  //   }
  // },

  render: function () {
    return (
      <div className="content">
        {this.props.children}
      </div>
    );
  }
});

  //New thing to keep eye on - how to structure routes
  // for reviews. Nested under user ? One each for new and edit?
  // Index route?



var routes = (
  <Route path="/" component={ App } onEnter={SessionsApiUtil.fetchCurrentUser}>

    <Route component={ Home } >
      <IndexRoute component={ CourseSuggestions } onEnter={ _ensureLoggedIn } />
      <Route path="courses/:courseId" component={ CourseShow } />
      <Route path="reviews" component={ ReviewIndex } />
      <Route path="reviews/new" component={ ReviewForm } />
      <Route path="search" component={ Search } />
      <Route path="users" component={ UserIndex } />
      <Route path="users/:id" component={ UserShow } />
      <Route path="users/:id/edit" component={ EditUserForm } />
    </Route>

    <Route path="login" component={ CourseIndex } onEnter={ _ensureLoggedOut }/>
  </Route>
);
// this function prevents logged out users from visiting the home
// route where their lack of credentials would cause site errors

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
}

// this function prevents logged in users frmo visiting the login route

function _ensureLoggedOut(nextState, replace, callback) {
  debugger
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfLoggedIn);
  }

  function _redirectIfLoggedIn() {
    if (CurrentUserStore.isLoggedIn()) {
      replace({}, "/");
    }
    callback();
  }
}

$(function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
