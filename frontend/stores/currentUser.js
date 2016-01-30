var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _currentUser = {};
var CurrentUserStore = new Store(AppDispatcher);
var CurrentUserConstants = require('../constants/current_user_constants');

var _currentUserHasBeenFetched = false;

CurrentUserStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  if (payload.actionType === CurrentUserConstants.RECEIVE_CURRENT_USER) {
    _currentUserHasBeenFetched = true;
    _currentUser = payload.currentUser;
    CurrentUserStore.__emitChange();
  } else if (payload.actionType === CurrentUserConstants.LOGOUT_USER) {
    _currentUserHasBeenFetched = false;
    _currentUser = {};
    CurrentUserStore.__emitChange();
  }
};

module.exports = CurrentUserStore;
