var React = require('react');
var ReactRouter = require('react-router');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ApiUtil = require('./../../util/api_util');
var ReviewApiUtil = require('./../../util/review_api_util');
var SessionsApiUtil = require('./../../util/sessions_api_util');

var CurrentUserStore = require('./../../stores/currentUser');
var ReviewStore = require('./../../stores/review');
var CourseStore = require('./../../stores/course');

var ReviewIndex = React.createClass({

  getInitialState: function () {
    return {
      reviews: ReviewStore.all()
    };
  },

  componentDidMount: function () {
    // this.courseListener = CourseStore.addListener(this._coursesChanged);
    // ApiUtil.fetchCourses();
    this.reviewsListener = CourseStore.addListener(this._reviewsChanged);
    ReviewApiUtil.fetchReviews();
  },

  _reviewsChanged: function () {
    this.setState(this.getStateFromStore());
  },

  getStateFromStore: function () {
    return {
			reviews: ReviewStore.all()
		};
  },

  componentWillUnmount: function () {
    // this.courseListener.remove();
    this.reviewsListener.remove();
    // this.currentUserListener.remove();
  },


  render: function () {
    if (!this.state.reviews) {
      return <div></div>;
    }

    var current_user = CurrentUserStore.currentUser().id;
    debugger
    var all_revs = this.state.reviews.filter(function (review) {
      return review.user_id === current_user.id;
    });
    debugger

    return (<div>reviews index</div>);
  }
});

module.exports = ReviewIndex;
