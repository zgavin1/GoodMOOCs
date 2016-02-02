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

    UsersApiUtil.createUser(this.state, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

	render: function () {
		return (
      <div className="header-lower group">
        <div className="catchphrase">
          <h1>You'll love <br/> your next class.</h1>
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
            <span><i className="fa fa-facebook-square"></i></span>
            <span><i className="fa fa-twitter-square"></i></span>
            <span><i className="fa fa-google"></i></span>
            <span><i className="fa fa-amazon"></i></span>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = NewUserForm;
