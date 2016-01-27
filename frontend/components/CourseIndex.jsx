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
        <li className="landing-page-course-index-item" key={ course.id }>
          <a href={ course.course_url } ><img src={ course.img_url }/></a>
        </li>
      );
    });

    return (
      <div className="landing-page-sugguestions" >
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

        <div>
          <h3> What will <em>you</em> discover?</h3>
          <ul className="landing-page-course-index" >{ courses }</ul>
        </div>
      </div>
    );
  }
});

module.exports = CourseIndex;
