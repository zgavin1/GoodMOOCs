var React = require('react');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require('./../stores/currentUser');
var History = require('react-router').History
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

    this.setState({currentUser: {}})
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
                <li>
                  <a href="#/">Home</a>
                </li>
                <li>
                  <a href="#/">My Courses</a>
                </li>
                <li>
                  <a href="#/">Friends</a>
                </li>
                <li>
                  <a href="#/">Recommendations</a>
                </li>
                <li>
                  <a href="#/">Explore</a>
                </li>
                <li>
                  <a className="dropDownOpener" href="#"></a>
                </li>
              </ul>
              <div className="user-nav group">
                <span className="badge">g</span>
                <span><i className="fa fa-envelope"></i></span>
                <span><i className="fa fa-users"></i></span>
                <span><i className="fa fa-user"></i></span>
                <a className="dropDownOpener" href="#"></a>
              </div>
              <button onClick={ this.logout }>LOG OUT</button>
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