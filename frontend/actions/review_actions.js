var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var ReviewActions = {
  receiveReviews: function (reviews) {
    AppDispatcher.dispatch({
      actionType: CourseConstants.REVIEWS_RECEIVED,
      reviews: reviews
    });
  }
};

module.exports = ReviewActions;
