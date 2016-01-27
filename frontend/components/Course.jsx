var React = require('react');
var ReactDOM = require('react-dom');

var CourseStore = require('../stores/course');

var Course = React.createClass({
  render: function () {
    var courses = CourseStore.all().map(function (course) {
      return (
        <li>
          <h1>{course.title}</h1>
          <a>{course.url}</a>
        </li>
      );
    });

    return (
      <div>
        <ul>{ courses }</ul>
      </div>
    );
  }
});

module.exports = Course;
