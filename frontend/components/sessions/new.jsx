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

  demoSession: function (e) {
    e.preventDefault();
    SessionsApiUtil.login(
      {
        username: "Zach Gavin",
        password: "zgavin1"
      },
      function () {
        this.history.pushState({}, "/");
      }.bind(this)
    );
  },

	render: function () {
		return (
      <div className="header-upper">
        <div className="header-nav group">
          <h1 className="header-nav-logo">
            <a href="#">good<strong>moocs</strong></a>
          </h1>
          <div className="new-session-form">
            <form className="new-session-form group" onSubmit={this.onSubmit}>
              <input type="text" name="username" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <form className="demo-form group" onSubmit={this.demoSession}>
            <button>Demo User</button>
          </form>
        </div>
      </div>
		);
	}
});

module.exports = Session;
