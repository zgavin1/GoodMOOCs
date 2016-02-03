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
};

var _addReview = function (review) {
  _reviews[review.id] = review;
};

ReviewStore.all = function () {
  var reviews = [];
  for (var id in _reviews) {
    reviews.push(_reviews[id]);
  }

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
