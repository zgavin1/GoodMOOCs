var React = require('react');
var ReactRouter = require('react-router');

var Course = React.createClass({


  render: function () {
    var course = this.props.course;
    if ($.isEmptyObject(course)) {
      return (<div></div>);
    }

    return (
      <div>
        <img src={course.image}/>
        <h2>{ course.title }</h2>
        <h3> from
          <a href="#">
            { course.course_provider_id }
          </a>
        </h3>
        <p>{course.description}</p>
      </div>
    );
  }
});

module.exports = Course;
