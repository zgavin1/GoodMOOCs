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

  postReview: function (reviewParams, callback) {

    $.ajax({
      type: "POST",
      url: "api/reviews",
      data: {review: reviewParams},
      success: function (review) {
        ReviewActions.postReview(review);
        callback && callback();
      },
      error: function () {
        console.log("review post error");
      }
    });
  }
};

module.exports = ReviewApiUtil;
