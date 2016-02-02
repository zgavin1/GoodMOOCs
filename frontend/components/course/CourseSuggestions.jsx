var React = require('react');
var ReactDOM = require('react-dom');

var CourseStore = require('./../../stores/course');
var ApiUtil = require('./../../util/api_util');
var CourseIndexItem = require('./CourseIndexItem');
var History = require('react-router').History;

var CourseSuggestions = React.createClass({
  mixins: [History],

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

  handleCourseClick: function (course) {
    this.history.pushState(null, "courses/" + course.id);
  },

  render: function () {
    if (!this.state.courses) {
      return <div></div>;
    }
    // var handleCourseClick = this.handleCourseClick;
    var courses = this.state.courses;
    var suggestions = courses.map(function (course) {
      // var boundClick = handleCourseClick.bind(null, course);
      if (course.average_rating >= 3) {
        return (
          <CourseIndexItem
            className="suggestion"
            key={course.id}
            course={course} />
        );
      }
    });

    return (
      <div className="course-suggestions group">
        <div className="course-suggestions-left">
          <h1 className="suggestions-header"><a href="/">Right now, this simply displays highly rated courses</a></h1>
          <ul className="course-suggestions-index group">
            { suggestions }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = CourseSuggestions;
