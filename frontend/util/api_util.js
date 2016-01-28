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
      url: "api/reviews",
      success: function () {
        ApiActions.receiveReviews(courses);
      }
    });
  },

  postReview: function (review) {
    $.ajax({
      type: "POST",
      url: "api/reviews",
      data: review,
      success: function (review) {
        ApiActions.reviewPosted(review);
      }
    });
  }
};

module.exports = ApiUtil;
