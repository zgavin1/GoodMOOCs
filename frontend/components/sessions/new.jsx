var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var Session = React.createClass({
  mixins: [History],

  onSubmit: function (e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};

    fields.forEach(function (field) {
      credentials[field.name] = field.value;
    }.bind(this));

    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

	render: function () {

		return (
      <form onSubmit={this.onSubmit}>
        <h3>Sign In</h3>
        <label>Username
          <input name="username"></input>
        </label>
        <label>Password
          <input type="password" name="password"></input>
        </label>
        <button>Sign In</button>
      </form>
		);
	}
});

module.exports = Session;




// My new session form from rails authentication
// <h2>Sign In</h2>
//
// <form action="<%= session_url %>" method="post">
//   <%= auth_token_input %>
//   <input type="hidden" name="user[username]" value="password">
//   <input type="hidden" name="user[password]" value="password">
//   <button>Demo User</button>
// </form>
//
// <br><br>
// <form action="<%= session_url %>" method="post">
//   <%= auth_token_input %>
//
//
//   <input type="text" name="user[username]" value="" placeholder="Username">
//
//   <br>
//   <input type="password" name="user[password]" value="" placeholder="Password">
//   <br>
//   <button>Submit</button>
// </form>
