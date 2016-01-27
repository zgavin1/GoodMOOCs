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
  },

  fetchReviews: function () {
    $.ajax({
      type: "GET",
      url: "api/courses",
      success: function () {
        ApiActions.receiveReviews(courses);
      }
    });
  }
};

module.exports = ApiUtil;
