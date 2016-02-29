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
      }
    });
  },

  updateUser: function (attrs, id, callback) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'PUT',
      dataType: 'json',
      data: attrs,
      processData: false,
      contentType: false,
      success: function (user) {
        UserActions.receiveUser(user);
        callback && callback();
      },
      error: function (data) {
        if (id == 52) {
          alert("Please do not edit my name! It will cause issues with the demo feature");
        }
      }
    });
  }
};


module.exports = UsersApiUtil;
