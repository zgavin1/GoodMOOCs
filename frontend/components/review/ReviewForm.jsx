var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ReactDOM = require('react-dom');

var ReviewStore = require('./../../stores/review');
var ReviewApiUtil = require('./../../util/review_api_util');
var History = require('react-router').History;

var ReviewForm = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return ({ rating: 5, reviewBody: "" });
  },


  handleSubmit: function (e) {
    e.preventDefault();
    var course = this.props.course;
    var user_id = this.context.currentUser.id;

    this.setState({user_id: this.context.currentUser.id, course: this.props.course});
    var params = {
      user_id: user_id,
      course_id: course.id,
      rating: this.state.rating,
      body: this.state.reviewBody
    };

    ReviewApiUtil.postReview(params, function () {
      this.history.pushState({}, "courses/"+ course.id);
    }.bind(this));
  },

  render: function () {
    return (
      <div className="review-form-content">
        <h3> Post your review </h3>
        <form onSubmit={this.handleSubmit}>
          <label> My rating:
            <input
              className="review-input"
              type="number"
              valueLink={this.linkState('rating')} />
          </label>
          
          <label>
            What did you think?
            <textarea
              className="review-input body"
              placeholder="Enter your review (optional)"
              valueLink={this.linkState('reviewBody')} />
          </label>
          <button className="review-form-button submit" type="submit">Save</button>
          <a className="review-form-button cancel" onClick={ this.props.handleCancel }>Cancel</a>
        </form>
      </div>
    );
  }
});

module.exports = ReviewForm;
