var React = require('react');
var UsersApiUtil = require('./../../util/user_api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserStore = require('./../../stores/user');


var EditUserForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onChange);
    UsersApiUtil.fetchUser(this.props.params.id);
  },

  onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  getStateFromStore: function () {
    var user = UserStore.findUserById(parseInt(this.props.params.id));
    return user || {};
  },

  onSubmit: function (e) {
    e.preventDefault();

    var user_params = { user: this.state };

    UsersApiUtil.updateUser(user_params, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

	render: function () {
    var user = this.state;
    if (!user) {
      return <div></div>;
    }
// Need to include updating user avatar

		return (
      <div className="edit-page">
        <div className="edit-user-header">
          <h1>Account settings.</h1>
        </div>
        <div className="edit-user-form-pane">
          <form className="edit-user-form" onSubmit={this.onSubmit}>
            <label> Name
              <input type="text" valueLink={this.linkState('username')} />
            </label>
            <label> Email Address
              <input type="text" valueLink={this.linkState('email')} />
            </label>
            <button>Save Profile Settings</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = EditUserForm;
