var React = require('react');
var UsersApiUtil = require('./../../util/user_api_util');
var History = require('react-router').History;

var UserForm = React.createClass({
  mixins: [History],

  onSubmit: function (e) {
    e.preventDefault();

    var fields = $(e.currentTarget).serializeArray();
    var credentials = {user: {}};

    fields.forEach(function (field) {
      credentials["user"][field.name] = field.value;
    }.bind(this));

    UsersApiUtil.createUser(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

	render: function () {
		return (
      <div className="header-lower group">
        <div className="catchphrase">
          <h1>You`ll love <br/> your next class.</h1>
        </div>
        <div className="new-user-form-pane">
          <h2>New here? Create a free account!</h2>
          <form className="new-user-form" onSubmit={this.onSubmit}>

            <input type="text" name="username" placeholder="Name" />
            <br/>
            <input type="text" name="email" placeholder="Email Address" />

            <br/>
            <input type="password" name="password" placeholder="Password" />

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
