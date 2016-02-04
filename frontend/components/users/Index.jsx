var React = require('react');
var ReactDOM = require('react-dom');

var UserStore = require('./../../stores/user');
var UserApiUtil = require('./../../util/user_api_util');
var UserShow = require('./Show');
var UserIndexItem = require('./IndexItem');

var UsersIndex = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

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
      if (user.id !== this.context.currentUser.id) {
        return (
          <UserIndexItem
            className="user-index-item"
            user={ user }
            key={ user.id }/>
        );
      }
    }.bind(this));

    return (
      <div className="users-pane group">
        <h2 className="users-title">Users</h2>
        <div className="users-pane-left">
          <ul className="users-list group">{ users }</ul>
        </div>
        <div className="users-pane-right">
          <div> More user features</div>
        </div>
      </div>
    );
  }
});

module.exports = UsersIndex;
