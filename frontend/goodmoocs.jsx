var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var React = require('react');
var ReactDOM = require('react-dom');

var CourseIndex = require('./components/course/CourseIndex');
var CourseShow = require('./components/course/CourseShow');
var ReviewForm = require('./components/review/ReviewForm');

var App = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ CourseIndex } />
    <Route path="courses/:courseId" component={ CourseShow }>
      <Route path="review/:reviewId" components={ ReviewForm }/>
    </Route>
  </Route>
);

$(function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
});
