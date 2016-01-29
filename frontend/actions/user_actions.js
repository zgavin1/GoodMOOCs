var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var UserActions = {
	receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },

  createUser: function (user) {
  	AppDispatcher.dispatch({
  		actionType: UserConstants.USER_RECEIVED,
  		user: user
  	});
  }
}

module.exports = UserActions;