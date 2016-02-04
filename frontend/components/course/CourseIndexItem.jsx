var React = require('react');
var ReactRouter = require('react-router');

var CourseIndexItem = React.createClass({
  render: function () {
    var course = this.props.course;

    if (this.props.className === "landing-page-course-index-item") {
      return (
        <li className={this.props.className + " index-link"} onClick={this.props.onClick}>
          <a href={"#/courses/" + course.id}><img className="course-img" src={ course.image_url }/></a>
          <a href={"#/courses/" + course.id}><p>{course.title}</p></a>
        </li>
      );
    } else if (this.props.className === "suggestion") {
      return (
        <li className={"index-link " + this.props.className} >
          <a href={"#/courses/" + course.id} ><img className="course-img suggestion-img" src={ course.image_url }/></a>
          <div className="suggestion-info">
            <h2>
              <a href={"#/courses/" + course.id} >{course.title}</a>
            </h2>
            <h3>
              <a>from {course.course_provider.name}</a>
            </h3>
            <p>{course.description}</p>
          </div>
        </li>
      );
    } else if (this.props.className === "related-course") {
      return (
        <a href={"#/courses/" + course.id} className={"index-link " + this.props.className}>
          <img className="rltd-course-img" src={this.props.course.image_url} />
        </a>
      );
    }
//
// above is the return for the anonymous (logged out) user course index
// below is the return for suggestions

  }

});

module.exports = CourseIndexItem;
