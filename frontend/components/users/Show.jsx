var React = require('react');
var UserStore = require('./../../stores/user');
var UsersApiUtil = require('./../../util/user_api_util');

var UserShow = React.createClass({
	getInitialState: function () {
		return this.getStateFromStore();
	},

	componentDidMount: function () {
		this.userListener = UserStore.addListener(this.onChange);
    // UsersApiUtil.fetchUsers();
    UsersApiUtil.fetchUser(this.props.params.id);
	},

	onChange: function () {
		this.setState(this.getStateFromStore());
	},

	componentWillUnmount: function () {
		this.userListener.remove();
	},

	getStateFromStore: function () {
		return {
			user: UserStore.findUserById(parseInt(this.props.params.id))
		};
	},

  render: function () {
    var user = this.state.user;
    if (!user) {
      return <div></div>;
    }

    return (
      <div>
        <h2>{user.username}</h2>
        <img src={user.avatar}/>
      </div>
    );
  }

});

module.exports = UserShow;
