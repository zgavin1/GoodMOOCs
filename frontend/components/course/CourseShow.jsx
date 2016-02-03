var React = require('react');
var ReactRouter = require('react-router');
var CourseStore = require('./../../stores/course');
var ReviewStore = require('./../../stores/review');
var ApiUtil = require('./../../util/api_util');

var Course = require('./Course');

var CourseShow = React.createClass({
  getInitialState: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId) || {};
    return {
      course: course,
      avg_rating: course.avg_rating
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
    this.setState({avg_rating: course.average_rating});
  },

  _courseChange: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId);
    this.setState( { course: course, avg_rating: course.average_rating });
  },

  componentWillUnmount: function () {
    this.courseListener.remove();
    this.reviewsListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchCourse(parseInt(newProps.params.courseId));
  },

  render: function () {
    var related_courses = CourseStore.all().filter(function (course) {
      if (this.state.course.subject === course.subject && this.state.course.id !== course.id) {
        return true;
      } else {
        return false;
      }
    }.bind(this));

    return (
      <div>
        <Course course={ this.state.course } related_courses={ related_courses } avg_rating={ this.state.avg_rating } />
      </div>
    );
  }
});

module.exports = CourseShow;
