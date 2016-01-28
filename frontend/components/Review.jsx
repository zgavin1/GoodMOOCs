var React = require('react');
var ReactDOM = require('react-dom');

var ReviewStore = require('../stores/review');
var ApiUtil = require('../util/api_util');

var Review = React.createClass({

  render: function () {
    return (
      <div className="review">
        <h3>Jeff rated it <span>**rating**</span></h3>
        <p>Thoughts here.</p>
      </div>
    );
  }
});

module.exports = Review;
