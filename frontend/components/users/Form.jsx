var React = require('react');
var UsersApiUtil = require('./../../util/user_api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var NewUserForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return ({
      username: "",
      email: "",
      password: "",
    });
  },

  onSubmit: function (e) {
    e.preventDefault();
    var params = { user: this.state };

    UsersApiUtil.createUser(params, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

	render: function () {
		return (
      <div className="header-lower group">
        <div className="catchphrase">
          <h1>Get. More.<br/>Knowledge.</h1>
        </div>
        <div className="new-user-form-pane">
          <h2>New here? Create a free account!</h2>
          <form className="new-user-form" onSubmit={this.onSubmit}>

            <input type="text" placeholder="Name" valueLink={this.linkState('username')} />
            <br/>
            <input type="text" placeholder="Email Address" valueLink={this.linkState('email')} />

            <br/>
            <input type="password" placeholder="Password" valueLink={this.linkState('password')} />

            <br/>
            <button>Sign Up</button>
          </form>
          <div className="o-auth">
            or sign in using
            <span><a href="/auth/facebook"><i className="fa fa-facebook-square"></i></a></span>
          </div>

        </div>
      </div>
    );
  }
});
    // For future omniauths.
    // <span><a href="/auth/google"><i className="fa fa-google"></i></a></span>
    // <span><i className="fa fa-twitter-square"></i></span>
    // <span><i className="fa fa-amazon"></i></span>
module.exports = NewUserForm;
