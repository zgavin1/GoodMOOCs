var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchCourses: function () {
    $.ajax({
      type: "GET",
      url: "api/courses",
      success: function (courses) {
        ApiActions.receiveAll(courses);
      }, failure: function () {
        alert("fetch courses failed");
      }
    });
  }
};

module.exports = ApiUtil;
