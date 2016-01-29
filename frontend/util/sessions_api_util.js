
var SessionApiUtil = {
	login: function (credentials, successCallback) {
		$.ajax({
				type: "POST",
				url: "api/session",
				data: credentials,
				success: function () {
					//
					// successCallback && successCalback();
				}
		});
	},

	logout: function () {
		$.ajax({

		});
	},

	fetchCurrentUser: function () {
		$.ajax({
			type: "GET",
			url: "api/session",
			success: function (currentUser) {
				//
			}
		});
	}
}