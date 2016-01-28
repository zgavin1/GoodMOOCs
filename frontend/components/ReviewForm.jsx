var React = require('react');
var ReactDOM = require('react-dom');

var ReviewStore = require('../stores/review');
var ApiUtil = require('../util/api_util');

var ReviewForm = React.createClass({

  render: function () {
    return (
      <div>
        <h3> Post your review </h3>
        <form>
          <label> My rating:
            <input className="review-input" type="number"></input>
          </label>
          <br/>
          <label>
            What did you think?
            <input
              className="review-input"
              placeholder="Enter your review (optional)"
              type="textarea">
            </input>
          </label>
          <button>Save</button>
        </form>
      </div>
    );
  }
});

module.exports = ReviewForm;
