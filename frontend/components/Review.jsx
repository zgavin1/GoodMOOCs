var React = require('react');
var ReactDOM = require('react-dom');

var ReviewStore = require('../stores/review');
var ApiUtil = require('../util/api_util');

var Review = React.createClass({
  componentDidMount: function () {
    this.reviewsListener = ReviewStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.reviewsListener.remove();
  },

  render: function () {

  }
});

module.exports = Review;
