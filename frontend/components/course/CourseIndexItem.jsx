var React = require('react');
var ReactRouter = require('react-router');

var CourseIndexItem = React.createClass({
  // mixins: [ReactRouter.history],
  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  },


//Render for front page, just image links

  render: function () {
    var course = this.props.course;
    return (
      <li className="index-link" onClick={this.props.onClick}>
        <img src={ course.image_url }/>
      </li>
    );
  }



// Render for large lists with all info

  // render: function(){
  //   var course = this.props.course;
  //   return (
  //       <li onClick={this.props.onClick}>
  //         {course.title}
  //         <br/>
  //         {course.description}
  //         <br/>
  //         Rating: { course.average_rating || "No reviews yet"}
  //         <br/>
  //         <img src={course.img_url}/>
  //       </li>
  //   );
  // }
});

module.exports = CourseIndexItem;
