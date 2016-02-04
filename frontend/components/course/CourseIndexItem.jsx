var React = require('react');
var ReactRouter = require('react-router');

var CourseIndexItem = React.createClass({
  render: function () {
    var course = this.props.course,
        klass = this.props.className;

    if (klass === "landing-page-course-index-item") {
      return (
        <li className={klass + " index-link"} onClick={this.props.onClick}>
          <a href={"#/courses/" + course.id}><img className="course-img" src={ course.image_url }/></a>
          <a href={"#/courses/" + course.id}><p>{course.title}</p></a>
        </li>
      );
    } else if (klass === "suggestion") {
      return (
        <li className={"index-link " + klass} >
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
    } else if (klass === "related-course") {
      return (
        <a href={"#/courses/" + course.id} className={"index-link " + klass}>
          <img className="rltd-course-img" src={course.image_url} />
        </a>
      );
    } else if (klass === "search-result"){
      return (
        <li className={klass + " group"}>
          <a href={"#/courses/" + course.id} className="search-result-image-container">
            <img className="search-result-image" src={course.image_url} />
          </a>
          <div className="search-result-info">
            <h2 className="search-result-title"><a href={"#/courses/" + course.id}>{course.title}</a></h2>
            <h3 className="search-result-provider"> by <a>{" " +course.course_provider.name}</a></h3>
          </div>

        </li>
      );
    }
//
// above is the return for the anonymous (logged out) user course index
// below is the return for suggestions

  }

});

module.exports = CourseIndexItem;
