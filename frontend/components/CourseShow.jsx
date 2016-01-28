var React = require('react');
var ReactRouter = require('react-router');
var CourseStore = require('../stores/course');
var Course = require('./Course');
var ApiUtil = require('../util/api_util');

var CourseShow = React.createClass({
  getInitialState: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId) || {};
    return { course: course };
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
    alert("hit mount");
    this.courseStoreListener = CourseStore.addListener(this._courseChange);
    ApiUtil.fetchCourses();
  },

  _courseChange: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId);
    this.setState( { course: course });
  },

  componentWillUnmount: function () {
    this.courseStoreListener.remove();
  },

  render: function () {
    return (
      <div>
        <Course
          course={ this.state.course }
          />
        {this.props.children}
      </div>
    );
  }
});

module.exports = CourseShow;
