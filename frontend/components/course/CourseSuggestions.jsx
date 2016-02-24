var React = require('react');
var ReactDOM = require('react-dom');

var CourseStore = require('./../../stores/course');
var ApiUtil = require('./../../util/api_util');
var CourseIndexItem = require('./CourseIndexItem');
var History = require('react-router').History;

var CourseSuggestions = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

  mixins: [History],

  getInitialState: function () {
    return {
      courses: CourseStore.all(),
      showCount: 20
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

  twentyMore: function () {
    this.setState({ showCount: this.state.showCount + 20 });
  },

  render: function () {
    if (!this.state.courses) {
      return <div></div>;
    }
    // var handleCourseClick = this.handleCourseClick;
    var courses = this.state.courses;
    var i = 0;
    var suggestions = courses.map(function (course) {
      // var boundClick = handleCourseClick.bind(null, course);
      if (i < this.state.showCount) {
        i++;
        return (
          <CourseIndexItem
            className="suggestion"
            key={course.id}
            course={course} />
        );
      }
    }.bind(this));

    return (
      <div className="course-suggestions group">
        <div className="course-suggestions-left group">
          <h1 className="suggestions-header"><a>These are our most highly rated courses!</a></h1>
          <ul className="course-suggestions-index group">
            { suggestions }
          </ul>
          <a className="course-suggestions-see-more" onClick={ this.twentyMore } >See More</a>
        </div>
      </div>
    );
  }
});

module.exports = CourseSuggestions;
