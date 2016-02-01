var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _users = {};
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/user_constants');

var resetUsers = function (usersArray) {
	_users = {};
	usersArray.forEach(function (user) {
		_users[user.id] = user;
	});
	return _users;
};

var _addUser = function (newUser) {
	_users[newUser.id] = newUser;
};

UserStore.all = function () {
	var users = [];
	Object.keys(_users).forEach(function (userId) {
		users.push(_users[userId]);
	}.bind(this));

	return users;
};

UserStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case UserConstants.USERS_RECEIVED:
			resetUsers(payload.users);
			UserStore.__emitChange();
			break;
		case UserConstants.USER_RECEIVED:
			_addUser(payload.user);
			UserStore.__emitChange();
			break;
	}
};

UserStore.findUserById = function (id) {
	if (_users[id]) {
		return _users[id];
	}
	return undefined;
};


module.exports = UserStore;
