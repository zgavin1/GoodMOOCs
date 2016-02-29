var ReviewActions = require('./../actions/review_actions');

var ReviewApiUtil = {
  fetchReviews: function () {
    $.ajax({
      type: "GET",
      url: "api/reviews",
      dataType: 'json',
      success: function (reviews) {
        ReviewActions.receiveReviews(reviews);
      }
    });
  },

  postReview: function (reviewParams, callback) {

    $.ajax({
      type: "POST",
      url: "api/reviews",
      data: {review: reviewParams},
      success: function (review) {
        ReviewActions.postReview(review);
        callback && callback();
      }
    });
  }
};

module.exports = ReviewApiUtil;
