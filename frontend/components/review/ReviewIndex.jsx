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

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      reviews: ReviewStore.all()
    };
  },

  componentDidMount: function () {
    // this.courseListener = CourseStore.addListener(this._coursesChanged);
    // ApiUtil.fetchCourses();
    this.reviewsListener = ReviewStore.addListener(this._reviewsChanged);
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

    var current_user = this.context.currentUser;
    var all_revs = this.state.reviews.filter(function (review) {
      return review.user_id === current_user.id;
    });

    var rev_rows = all_revs.map(function (rev) {
      var course = rev.course;

      var avgRating = parseFloat(Math.ceil(course.avg_rating * 100)/100);
      return (
        <tr key={rev.id}>
          <td><img className="reviews-table-image" src={course.img} /></td>
          <td>{course.title}</td>
          <td>{course.course_provider.name}</td>
          <td>{avgRating}</td>
          <td>{rev.rating}</td>
        </tr>
      );
    }.bind(this));

    return (
      <div className="reviews-index">
        <div className="reviews-index-header group">
          <h1><a href="#/reviews">My Courses</a></h1>
          <div className="reviews-index-header-nav">
            <input className="course-index-search" type="text" placeholder="Search and add books"/>
            <a href="#/reviews" > Batch Edit </a>
            <a href="#/reviews" > Settings </a>
            <a href="#/reviews" > Stats </a>
            <a href="#/reviews" > Print </a>

            <i className="fa fa-th-large"></i>
            <i className="fa fa-th-list"></i>
          </div>
        </div>
        <table className="reviews-table group">
          <thead className="reviews-table-head">
            <tr>
              <th>image</th>
              <th>title</th>
              <th>provider</th>
              <th>avg rating</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody className="reviews-table-body">
            { rev_rows }
          </tbody>
        </table>
      </div>);
  }
});

module.exports = ReviewIndex;
