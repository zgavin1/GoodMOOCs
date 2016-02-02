var React = require('react');
var ReactRouter = require('react-router');

var Course = React.createClass({
  render: function () {
    var course = this.props.course;

    if ($.isEmptyObject(course)) {
      return (<div></div>);
    }

    var num_reviews = 0;
    for (var i = 0; i < course.reviews.length; i++) {
      if (course.reviews[i].body.length > 1) {
        num_reviews += 1;
      }
    }

    return (
      <div className="course-show-body">
        <div className="course-show-left group">
          <div className="course-img-col group">
            <img className="course-img" src={course.image_url}/>
            <a className="want-to-read">Want to Read</a>
            <p>Rate this book</p>
            <div className="rating">
              <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
          </div>
          <div className="course-info-col">
            <h1 className="course-title">{ course.title }</h1>
            from <h3 className="course-provider-name">
              <a href="#">
                { course.course_provider.name }
              </a>
            </h3>
            <br/>
            <div className="rating-stats">
              <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>
               <dot>·</dot>
              <a>avg rating: {course.average_rating}</a>
               <dot>·</dot>
              <a>{course.reviews.length} Ratings</a>
               <dot>·</dot>
              <a>{num_reviews} Reviews</a>
            </div>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Course;
