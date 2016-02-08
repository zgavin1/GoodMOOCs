var React = require('react');
var ReactDOM = require('react-dom');

var UserStore = require('./../../stores/user');
var ReviewStore = require('./../../stores/review');
var UserApiUtil = require('./../../util/user_api_util');

var Review = React.createClass({

	getInitialState: function () {
		UserApiUtil.fetchUser(this.props.review.user_id);
		var reviewer = this.getReviewer();

		return {
			reviewer: reviewer
		}
	},

	componentDidMount: function () {
		this.userListener = UserStore.addListener(this.updateReviewer);
	},

	componentWillUnmount: function () {
		this.userListener.remove();
	},

	updateReviewer: function () {
		var reviewer = this.getReviewer();

		this.setState({reviewer: reviewer});
	},

	getReviewer: function () {
		var reviewerId = this.props.review.user_id;
		var reviewer;


		UserStore.all().forEach(function (user) {
			if (user.id === reviewerId) {
				reviewer = user;
			}
		}.bind(this));

		return reviewer;
	},

  render: function () {
  	var review = this.props.review;
  	var reviewer = this.state.reviewer;

  	if (!reviewer) {return <p></p>;}

    return (
      <div className="review">
        <h3>{reviewer.username} rated it <span>{review.rating}</span></h3>
        <p> {review.body} </p>
      </div>
    );
  }
});

module.exports = Review;
