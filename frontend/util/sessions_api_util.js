var CurrentUserActions = require('./../actions/current_user_actions');

var SessionsApiUtil = {
	login: function (credentials, successCallback) {
		debugger
		$.ajax({
				type: "POST",
				url: "api/session",
				data: credentials,
        dataType: 'json',
				success: function (currentUser) {
          CurrentUserActions.receiveCurrentUser(currentUser);
          successCallback && successCallback();
        },
        error: function (msg) {
          console.log("error");
          console.log(msg);
        }
		});
	},

	logout: function (callback) {
		$.ajax({
      type: "DELETE",
      url: 'api/session',
      success: function () {
      	CurrentUserActions.logoutCurrentUser();
      	callback && callback();
      },
      error: function () {
      	console.log("blah");
      }
		});
	},

	fetchCurrentUser: function (callback) {
		$.ajax({
			type: "GET",
			url: "api/session",
			success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        callback && callback(currentUser);
			}
		});
	}
};

module.exports = SessionsApiUtil;
