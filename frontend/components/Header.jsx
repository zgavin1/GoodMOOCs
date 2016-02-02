var React = require('react');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require('./../stores/currentUser');
var History = require('react-router').History;
var SessionForm = require('./sessions/new');
var UserForm = require('./users/Form');

var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      currentUser: {}
    };
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  logout: function () {
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/");
    }.bind(this));

    this.setState({currentUser: {}});
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

  userDropDownToggle: function (e) {
    e.preventDefault();
    var udd = $('.user-dropdown');

    if (udd.hasClass('hidden')) {
      udd.removeClass('hidden');
    } else {
      udd.addClass('hidden');
    }

  },

  render: function() {


    if (CurrentUserStore.isLoggedIn()) {
      return (
        <header className="logged-in-header">
          <div className="site-header">
            <div className="header-nav logged-in-nav group">
              <h1 className="header-nav-logo-small">
                <a href="#/">good<strong>moocs</strong></a>
              </h1>
              <input className="site-search" type="text" placeholder="this will be a site search"/>
              <ul className="logged-in-site-nav">
                <li><a href="#/">Home</a></li>
                <li><a href="#/">My Courses</a></li>
                <li><a href="#/users">Friends</a></li>
                <li><a href="#/">Recommendations</a></li>
                <li><a href="#/">Explore</a></li>
                <li><a className="dropDownOpener" href="#" onClick={this.navDropDownToggle}><i className="fa fa-caret-down"></i></a></li>
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
              <div className="user-nav group">
                <span className="badge">g</span>
                <span><i className="fa fa-envelope"></i></span>
                <span><i className="fa fa-users"></i></span>
                <span><a href={"#/users/" + this.state.currentUser.id}><i className="fa fa-user"></i></a></span>
                <a className="dropDownOpener" href="#" onClick={this.userDropDownToggle}><i className="fa fa-caret-down"></i></a>
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
            </div>
          </div>
        </header>
      );
    } else {
      return (
        <header>
          <div className="site-header">
            <SessionForm />
            <UserForm />
          </div>
        </header>

      );
    }

  },

});

module.exports = Header;
