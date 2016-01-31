var React = require('react');
var UsersApiUtl = require('./../../util/sessions_api_util');

var UserForm = React.createClass({
  submit: function (e) {
    e.preventDefault();

    debugger
  },

	render: function () {
		return (
      <div className="header-lower group">
        <div className="catchphrase">
          <h1>You`ll love <br/> your next class.</h1>
        </div>
        <div className="new-user-form-pane">
          <h2>New here? Create a free account!</h2>
          <form className="new-user-form" onSubmit={this.submit}>

            <input type="text" name="username" value="" placeholder="Name" />
            <br/>
            <input type="text" name="email" value="" placeholder="Email Address" />

            <br/>
            <input type="password" name="password" value="" placeholder="Password" />

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

module.exports = UserForm;
