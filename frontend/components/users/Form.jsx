var React = require('react');
var UsersApiUtl = require('./../../util/sessions_api_util');

var UserForm = React.createClass({
  submit: function (e) {
    e.preventDefault();

    debugger
  },

	render: function () {
		return (
			<form onSubmit={this.submit}>
        <h3>Sign Up </h3>
        <label>Username
          <input name="username"></input>
        </label>
        <label> Email
          <input name="email"></input>
        </label>
        <label> Password
          <input name="password"></input>
        </label>
        <button>Sign Up</button>
			</form>
		);
	}
});

module.exports = UserForm;
