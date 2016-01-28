var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactDOM = require('react-dom');

var ReviewStore = require('../stores/review');
var ApiUtil = require('../util/api_util');

var ReviewForm = React.createClass({
  mixin: [LinkedStateMixin],
  getInitialState: function () {
    return ({ rating: 5, reviewBody: "" });
  },


  handleSubmit: function (e) {
    e.preventDefault();

    var review = $.extend(
      {},
      this.state,
      {
        user_id: this.props.params.userId,
        course_id: this.props.params.courseId
      }
    );

    ApiUtil.postReview(review);
  },

  render: function () {
    return (
      <div>
        <h3> Post your review </h3>
        <form onSubmit={this.handleSubmit}>
          <label> My rating:
            <input
              className="review-input"
              type="number"
              valueLink={this.linkState('rating')} />
          </label>
          <br/>
          <label>
            What did you think?
            <input
              className="review-input"
              placeholder="Enter your review (optional)"
              type="textarea"
              valueLink={this.linkState('reviewBody')} />
          </label>
          <br/>
          <button>Save</button>
        </form>
      </div>
    );
  }
});

module.exports = ReviewForm;
