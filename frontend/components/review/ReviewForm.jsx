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
    var course_id = this.props.location.state.course_id;
    var user_id = this.context.currentUser.id;

    this.setState({user_id: this.context.currentUser.id, course_id: this.props.location.state.courseId});
    var params = {
      user_id: user_id,
      course_id: course_id,
      rating: this.state.rating,
      body: this.state.reviewBody
    };
    ReviewApiUtil.postReview(params, function () {
      this.history.pushState({}, "/courses/"+course_id);
    });
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
