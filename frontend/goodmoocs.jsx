// var Route = require('react-flux').Route;
// var Router = require('react-router').Router;
// var $ = require('jquery');

var React = require('react');
var ReactDOM = require('react-dom');

var Course = require('./components/Course');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1> GoodMOOCs </h1>
        <Course />
      </div>
    );
  }
});

jQuery(function () {
  ReactDOM.render(<h1>Hey</h1>, document.getElementById('root'));
});
