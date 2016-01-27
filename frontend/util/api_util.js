var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchCourses: function () {
    $.ajax({
      type: "GET",
      url: "api/courses",
      success: function (courses) {
        ApiActions.receiveCourses(courses);
      }
    });
  }
};

module.exports = ApiUtil;
