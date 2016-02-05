var ReviewActions = require('./../actions/review_actions');

var ReviewApiUtil = {
  fetchReviews: function () {
    $.ajax({
      type: "GET",
      url: "api/reviews",
      dataType: 'json',
      success: function (reviews) {
        ReviewActions.receiveReviews(reviews);
      },
      error: function () {
        console.log('issues');
      }
    });
  },

  postReview: function (review) {
    $.ajax({
      type: "POST",
      url: "api/reviews",
      data: review,
      success: function (review) {
        ReviewActions.postReview(review);
      },
      error: function () {
        console.log("review post error");
      }
    });
  }
};

module.exports = ReviewApiUtil;
