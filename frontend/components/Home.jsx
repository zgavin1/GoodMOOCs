var React = require('react');
var ReactDOM = require('react-dom');
var CurrentUserStore = require('./../stores/currentUser');
var SessionsApiUtil = require('./../util/sessions_api_util');

var History = require('react-router').History;


var Home = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      currentUser: {}
    };
  },

  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this._onChange);
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

  render: function() {
    var user_nav;
    if (CurrentUserStore.isLoggedIn()) {
      user_nav =
      <div className="user-nav-container">
        <div className="user-nav-buttons group">
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
      </div>;
    } else {
      user_nav =
      <div className="user-nav-container">
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
              <input className="site-search" type="text" placeholder="this will be a site search"/>
              <ul className="logged-in-site-nav">
                <li><a href="#">Home</a></li>
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
