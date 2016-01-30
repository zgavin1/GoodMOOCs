var React = require('react');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require('./../stores/currentUser');
var History = require('react-router').History

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
    if (CurrentUserStore.isLoggedIn()) { // if we're logged in....
      return (
        <div>
          Logged in as
          { this.state.currentUser.email }
          <button onClick={ this.logout }>LOG OUT</button>
        </div>
      );
    } else {
      return ( 
        <div>
          <a href="#/login">Login</a> 
        </div>
      );
    }
    
  },

});

module.exports = Header;