var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _users = {};
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/user_constants');


var resetUsers = function (usersArray) {
	_users = {};
	usersArray.forEach(function (user) {
		_users{user.id} = user
	});
	return _users
};

UserStore._onDispatch = function (payload) {
	switch (payload.actionType) {
		case UserConstants.USERS_RECEIVED:
			resetUsers(payload.users);
			UserStore.__emitChange();
			break;
	}
}


module.exports = UserStore;