var React = require('react');
var CourseStore = require('./../../stores/course');
var ReviewStore = require('./../../stores/review');
var ApiUtil = require('./../../util/api_util');
var Review = require('./../review/Review');

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
      reviews: course.reviews
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
    var courseReviews = this.state.reviews.map(function (review) {
      return (
        <Review review={review} key={review.id}/>
      )
    }.bind(this));

    return courseReviews;
  },

  printCurrentUser: function () {
    console.log(CurrentUserStore.currentUser())
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

    return (
      <div>
        <Course course={ this.state.course } related_courses={ related_courses } avg_rating={ this.state.avg_rating } />
        { this.courseReviews() }
      </div>
    );
  }
});

module.exports = CourseShow;
