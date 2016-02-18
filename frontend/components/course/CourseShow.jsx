var React = require('react');
var CourseStore = require('./../../stores/course');
var ReviewStore = require('./../../stores/review');
var ApiUtil = require('./../../util/api_util');
var Review = require('./../review/Review');
var ReviewForm = require('./../review/ReviewForm');

var CurrentUserStore = require('./../../stores/currentUser');

var Course = require('./Course');

var CourseShow = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId) || {};
    return {
      course: course,
      avg_rating: course.avg_rating,
      reviews: course.reviews,
      showReviewForm: false
     };
  },

  _findCourseById: function (id) {
    var output;
    CourseStore.all().forEach(function (course) {
      if (id === course.id) {
        output = course;
      }
    }.bind(this));

    return output;
  },

  componentDidMount: function () {
    ApiUtil.fetchCourses();
    this.courseListener = CourseStore.addListener(this._courseChange);
    this.reviewsListener = ReviewStore.addListener(this._reviewAdded);
  },

  _reviewAdded: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId);
    this.setState({avg_rating: course.average_rating, reviews: course.reviews});
  },

  _courseChange: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId);
    this.setState({ course: course, avg_rating: course.average_rating, reviews: course.reviews });
  },

  componentWillUnmount: function () {
    this.courseListener.remove();
    this.reviewsListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchCourse(parseInt(newProps.params.courseId));
  },

  courseReviews: function () {
    var courseReviews = this.state.reviews
    // .sort(function (rev1, rev2) {
    //   rev1.created_at > rev2.created_at;
    // }.bind(this));
    courseReviews = courseReviews.map(function (review) {
      return (
        <Review review={review} key={review.id} />
      )
    }.bind(this));

    return courseReviews;
  },

  // printCurrentUser: function () {
  //   console.log(CurrentUserStore.currentUser())
  // },

  handleNewReview: function () {
    this.setState({showReviewForm: true});
  },

  hideReviewForm: function () {
    this.setState({showReviewForm: false});
  },


  render: function () {
    var related_courses = CourseStore.all().filter(function (course) {
      if (this.state.course.subject === course.subject && this.state.course.id !== course.id) {
        return true;
      } else {
        return false;
      }
    }.bind(this));

    if (Object.keys(this.state.course).length === 0) {
      return (<div></div>)
    }

    var reviewForm = (<div></div>);

    if (this.state.showReviewForm) {
      reviewForm = (
        <div className="review-form-container">
          <ReviewForm course={ this.state.course } reviewFormClose={ this.hideReviewForm }/>
        </div>
      )
    }

    return (
      <div className="course-show-body">
        <Course course={ this.state.course } related_courses={ related_courses } avg_rating={ this.state.avg_rating } handleNewReview={ this.handleNewReview }/>

        { reviewForm }

        <section className="course-reviews">
          <h3 className="course-review-header">Community Reviews</h3>

          { this.courseReviews() }
        </section>
      </div>
    );
  }
});

module.exports = CourseShow;
