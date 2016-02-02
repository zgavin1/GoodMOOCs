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

var ReviewForm = require('./components/review/ReviewForm');
var SessionForm = require('./components/sessions/new');
var UserShow = require('./components/users/Show');
var NewUserForm = require('./components/users/Form');
var EditUserForm = require('./components/users/EditForm');

var UserIndex = require('./components/users/Index');

var Header = require('./components/Header');

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
    var content;
    if ( !CurrentUserStore.isLoggedIn() ) {
      content = <CourseIndex />;
    } else {
      content = <div></div>;
    }

    return (
      <div className="main" oncClick={this.mainClick}>
        <Header />
        { content }
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ CourseSuggestions } onEnter={_ensureLoggedIn} />
    <Route path="courses/:courseId" component={ CourseShow }>
      <Route path="review/:reviewId" components={ ReviewForm }/>
    </Route>
    <Route path="login" component={ SessionForm } />
    <Route path="users/new" component={ NewUserForm } />
    <Route path="users/:id" component={ UserShow } />
    <Route path="users" component={ UserIndex } />
    <Route path="users/:id/edit" component={ EditUserForm } onEnter={_ensureLoggedIn}/>
  </Route>
);

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

$(function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
