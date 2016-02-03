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

  fetchCourse: function (id) {
    $.ajax({
      type: "GET",
      url: "api/courses/" + id,
      success: function (course) {
        ApiActions.receiveCourse(course);
      }
    });
  }
};

module.exports = ApiUtil;
