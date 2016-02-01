var React = require('react');
var ReactDOM = require('react-dom');

var UserStore = require('./../../stores/user');
var UserApiUtil = require('./../../util/user_api_util');
var UserShow = require('./Show');
var UserIndexItem = require('./IndexItem');

var UsersIndex = React.createClass({
  getInitialState: function () {
    return {
      users: UserStore.all()
    };
  },

  componentDidMount: function () {
    this.userStoreListener = UserStore.addListener(this._onChange);
    UserApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userStoreListener.remove();
  },

  _onChange: function () {
    this.setState({ users: UserStore.all() });
  },

  render: function () {
    var handleClick = this.handleClick;

    var users = UserStore.all().map(function (user) {
      return (
        <UserIndexItem
          className="user-list-item"
          user={ user }
          key={ user.id }/>
      );
    }.bind(this));

    return (
      <div className="user-index-pane">
        Here are our users!
        <ul className="user-list">{ users }</ul>
      </div>
    );
  }
});

module.exports = UsersIndex;
