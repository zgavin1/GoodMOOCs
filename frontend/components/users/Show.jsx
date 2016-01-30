var React = require('react');
var UserStore = require('./../../stores/user');
var UsersApiUtil = require('./../../util/user_api_util');

var UserShow = React.createClass({
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
		return {
			user: UserStore.findByUserId(parseInt(this.props.params.userId))
		};
	},



  render: function () {
    var user = this.state.user;

    return (
      <div>
        <h2>{user.username}</h2>
        <img src={user.avatar}/>
      </div>
    );
  }

});

module.exports = UserShow;
