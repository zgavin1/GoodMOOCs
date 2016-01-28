var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var ReviewActions = {
  receiveReviews: function (reviews) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.REVIEWS_RECEIVED,
      reviews: reviews
    });
  },

  postReview: function (review) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.REVIEW_POSTED,
      review: review
    });
  }
};

module.exports = ReviewActions;
