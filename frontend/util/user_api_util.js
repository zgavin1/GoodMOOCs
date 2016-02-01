var UserActions = require('../actions/user_actions');
var CurrentUserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  fetchUsers: function () {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        UserActions.receiveUsers(users);
      },
      error: function (users) {
        console.log("fetching error");
      }
    });
  },

  fetchUser: function (id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },

  createUser: function (attrs, callback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: attrs,
      success: function (user) {
        UserActions.receiveUser(user);
        CurrentUserActions.receiveCurrentUser(user);
        callback && callback();
      },
      error: function (user) {
        console.log("user created error");
      }
    });
  },

  updateUser: function (attrs, callback) {
    $.ajax({
      url: '/api/users/' + attrs.user.id,
      type: 'PUT',
      dataType: 'json',
      data: attrs,
      success: function (user) {
        UserActions.receiveUser(user);
        callback && callback();
      },
      error: function (data) {
        console.log("edit error");
      }
    });
  }
};


module.exports = UsersApiUtil;
