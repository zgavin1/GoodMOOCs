var React = require('react');
var ReactDOM = require('react-dom');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var CurrentUserStore = require('./../stores/currentUser');
var SessionsApiUtil = require('./../util/sessions_api_util');

var SearchResultsStore = require('../stores/search_results');
var SearchApiUtil = require('./../util/search_api_util');

var Home = React.createClass({
  childContextTypes: {
    currentUser: React.PropTypes.object
  },

  getChildContext: function() {
    return {currentUser: this.state.currentUser};
  },

//testing code above

  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return {
      currentUser: {},
      query: ""
    };
  },

  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this._onChange);
    SessionsApiUtil.fetchCurrentUser();
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
  },

  logout: function () {
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/login");
    }.bind(this));

    this.setState({currentUser: {}});
  },

  userDropDownToggle: function (e) {
    e.preventDefault();
    var udd = $('.user-dropdown');

    if (udd.hasClass('hidden')) {
      udd.removeClass('hidden');
    } else {
      udd.addClass('hidden');
    }

  },

  navDropDownToggle: function (e) {
    e.preventDefault();
    var ndd = $('.nav-dropdown');

    if (ndd.hasClass('hidden')) {
      ndd.removeClass('hidden');
    } else {
      ndd.addClass('hidden');
    }
  },

  instantSearch: function (e) {
    e.preventDefault();
    if (e.target.value.length > 2) {

      var query = e.target.value;
      SearchApiUtil.instantSearch(query, 1);

      this.setState({query: query});
    }
  },

  searchKeyUp: function (e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      this.searchAndRedirect(e);
    }
  },

  searchAndRedirect: function (e) {
    e.preventDefault();
    var query = this.state.query;
    SearchApiUtil.searchAndRedirect(query, 1, function () {
      this.history.pushState({query: query}, "/search");
    }.bind(this));
  },

  render: function() {
    var user_nav;
    if (CurrentUserStore.isLoggedIn()) {
      user_nav =
      <div className="user-nav-container group">
        <div className="user-nav-buttons group">
          <a href="#" className="badge">g</a>
          <a href="#/users"><i className="fa fa-users"></i></a>
          <a id="profile-thumb" href={"#/users/" + this.state.currentUser.id}><i className="fa fa-user"></i></a>
          <a className="drop-down-opener" href="#" onClick={this.userDropDownToggle}><i className="fa fa-caret-down"></i></a>
        </div>
        <div className="user-dropdown hidden">
          <a>Some</a>
          <a>Links</a>
          <a>Will</a>
          <a>Go</a>
          <a>Here</a>
          <a>Soon</a>
          <a><button onClick={ this.logout }>LOG OUT</button></a>
        </div>
      </div>;
    } else {
      user_nav =
      <div className="user-nav-container group">
        <a href="#/login"> Log In or Sign Up!</a>
      </div>;
    }
    return (
      <div>
        <header className="logged-in-header">
          <div className="site-header">
            <div className="header-nav logged-in-nav group">
              <h1 className="header-nav-logo-small">
                <a href="#/">good<strong>moocs</strong></a>
              </h1>
              <div className="search-container group">
                <input onKeyUp={this.searchKeyUp} className="site-search" type="text" placeholder="Search Users and Courses" valueLink={this.linkState('query')}/>
                <a type="submit" className="search-redirect" onClick={this.searchAndRedirect}>
                  <i className="fa fa-search"></i>
                </a>
              </div>
              <ul className="logged-in-site-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#/reviews">My Courses</a></li>
                <li><a href="#/users">Users</a></li>
                <li><a className="drop-down-opener" href="#" onClick={this.navDropDownToggle}><i className="fa fa-caret-down"></i></a></li>
              </ul>
              <div className="nav-dropdown hidden">
                <a>Some</a>
                <a>Links</a>
                <a>Will</a>
                <a>Go</a>
                <a>Here</a>
                <a>Soon</a>
                <a><button onClick={ this.logout }>LOG OUT</button></a>
              </div>
              { user_nav }
            </div>
          </div>
        </header>

        {this.props.children}
      </div>
    );
  }
});

module.exports = Home;
