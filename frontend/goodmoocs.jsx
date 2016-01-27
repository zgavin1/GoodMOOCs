var Route = require('react-router').Route;
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var React = require('react');
var ReactDOM = require('react-dom');

var CourseIndex = require('./components/CourseIndex');

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
  <Route path="/" component={App}>
    <IndexRoute component={CourseIndex} />
  </Route>
);

$(function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});
