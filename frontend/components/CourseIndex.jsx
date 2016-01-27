var React = require('react');
var ReactDOM = require('react-dom');

var CourseStore = require('../stores/course');
var ApiUtil = require('../util/api_util');

var CourseIndex = React.createClass({
  getInitialState: function () {
    return {
      courses: CourseStore.all()
    };
  },

  componentDidMount: function () {
    this.storeListener = CourseStore.addListener(this._onChange);
    ApiUtil.fetchCourses();
  },

  _onChange: function () {
    this.setState({ courses: CourseStore.all() });
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  render: function () {
    var courses = CourseStore.all().map(function (course) {
      return (
        <li>
          <h1>{course.title}</h1>
          <a href={course.url} >{course.url}</a>
        </li>
      );
    });

    return (
      <div>
        <h2>Course render</h2>
        <ul>{ courses }</ul>
      </div>
    );
  }
});

module.exports = CourseIndex;
