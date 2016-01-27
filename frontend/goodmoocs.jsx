// var Route = require('react-flux').Route;
// var Router = require('react-router').Router;
// var $ = require('jquery');

var React = require('react');
var ReactDOM = require('react-dom');

var CourseIndex = require('./components/CourseIndex');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1> GoodMOOCs App </h1>
        <CourseIndex />
      </div>
    );
  }
});

$(function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
