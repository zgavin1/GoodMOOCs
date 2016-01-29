var CurrentUserActions = require('../actions/current_user_actions');


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
          debugger
          successCallback && successCallback();
        }
		});
	},

	logout: function () {
		$.ajax({
      type: "DELETE",
      url: 'api/session',
      success: function () {

      }
		});
	},

	fetchCurrentUser: function (callback) {
		$.ajax({
			type: "GET",
			url: "api/session",
			success: function (currentUser) {
        console.log("fetched cur user");
        CurrentUserActions.receiveCurrentUser(currentUser);
        callback && callback();
			}
		});
	}
};

module.exports = SessionsApiUtil;
