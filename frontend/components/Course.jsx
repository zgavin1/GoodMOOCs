var React = require('react');
var ReactRouter = require('react-router');

var Course = React.createClass({


  render: function () {
    var course = this.props.course;
    return (
      <div>
        <img src={course.img_url}/>
        <h2>{ course.title }</h2>
        <h3> from
          <a href={ course.course_provider.home_url }>
            { course.course_provider.name }
          </a>
        </h3>
        <p>{course.description}</p>
      </div>
    );
  }
});

module.exports = Course;
