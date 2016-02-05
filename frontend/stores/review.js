var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _reviews = {};
var ReviewStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/review_constants');

var resetReviews = function (reviewsArray) {
  _reviews = {};
  reviewsArray.forEach(function (review) {
    _reviews[review.id] = review;
  });
  return _reviews;
};

var _addReview = function (review) {
  _reviews[review.id] = review;
};

ReviewStore.all = function () {
  var reviews = [];
  Object.keys(_reviews).forEach(function (reviewId) {
		reviews.push(_reviews[reviewId]);
	}.bind(this));

  return reviews;
};

ReviewStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReviewConstants.REVIEWS_RECEIVED:
      resetReviews(payload.reviews);
      ReviewStore.__emitChange();
      break;
    case ReviewConstants.REVIEW_POSTED:
      _addReview(payload.review);
      ReviewStore.__emitChange();
      break;
  }
};

module.exports = ReviewStore;
