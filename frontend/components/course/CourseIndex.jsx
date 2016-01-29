var React = require('react');
var ReactDOM = require('react-dom');

var CourseStore = require('./../../stores/course');
var ApiUtil = require('./../../util/api_util');
var CourseIndexItem = require('./CourseIndexItem')

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

  handleCourseClick: function (course) {
    this.props.history.pushState(null, "courses/" + course.id);
  },

  render: function () {
    var handleCourseClick = this.handleCourseClick;

    var courses = CourseStore.all().map(function (course) {
      var boundClick = handleCourseClick.bind(null, course);

      return (
        <CourseIndexItem
          className="landing-page-course-index-item"
          course={ course }
          key={ course.id }
          onClick={ boundClick } />
      );
    });

    return (
      <div className="landing-page-content group" >
        <div className="landing-page-intro group">
          <div className="landing-page-selling-point">
            <h3>Deciding what to read next?</h3>
            <p>
              You’re in the right place. Tell us what titles <br />
              or genres you’ve enjoyed in the past, and we’ll give <br />
              you surprisingly insightful recommendations.
            </p>
          </div>
          <div className="landing-page-selling-point">
            <h3>What are your friends reading?</h3>
            <p>
              Chances are your friends are discussing their  <br />
              favorite (and least favorite) books on Goodreads.  <br />
              Want to learn more? Take the tour.
            </p>
          </div>
        </div>

        <div className="discover group">
          <h3> What will <em>you</em> discover?</h3>
          <ul className="landing-page-course-index" >{ courses }</ul>
        </div>
      </div>
    );
  }
});

module.exports = CourseIndex;