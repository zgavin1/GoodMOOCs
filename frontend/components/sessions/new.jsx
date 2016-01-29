var React = require('react');
var SessionsApiUtl = require('./../../util/sessions_api_util');

var Session = React.createClass({
	render: function () {
		return (
			<form onSubmit>

			</form>
			)
	}
});

module.exports = Session;

<h2>Sign In</h2>



// My new session form from rails authentication

<form action="<%= session_url %>" method="post">
  <%= auth_token_input %>
  <input type="hidden" name="user[username]" value="password">
  <input type="hidden" name="user[password]" value="password">
  <button>Demo User</button>
</form>

<br><br>
<form action="<%= session_url %>" method="post">
  <%= auth_token_input %>


  <input type="text" name="user[username]" value="" placeholder="Username">

  <br>
  <input type="password" name="user[password]" value="" placeholder="Password">
  <br>
  <button>Submit</button>
</form>

<%= render 'users/form' %>
