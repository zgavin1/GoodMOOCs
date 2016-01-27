var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchCourses: function () {
    $.ajax({
      type: "GET",
      url: "api/benches",
      success: function (courses) {
        ApiActions.receiveAll(courses);
      }
    });
  }
};
