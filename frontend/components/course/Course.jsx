var React = require('react');
var ReactRouter = require('react-router');

var Course = React.createClass({
  render: function () {
    var course = this.props.course;

    if ($.isEmptyObject(course)) {
      return (<div></div>);
    }

    return (
      <div className="course-show-body">
        <div className="course-show-left group">
          <div className="course-img-col group">
            <img className="course-img" src={course.image_url}/>
            <a className="want-to-read">Want to Read</a>
            <p>Rate this book</p>
          </div>
          <div className="course-info-col">
            <h1 className="course-title">{ course.title }</h1>
            from <h3 className="course-provider-name">
              <a href="#">
                { course.course_provider.name }
              </a>
            </h3>
            <br/>
              <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>
            <a>avg rating: {course.average_rating}</a>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Course;
