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
      <div className="review group">
      	<img className="reviewer-avatar" src={reviewer.avatar}/>
        <div className="review-info-container group">
	        <h3 className="reviewer-title"><a href={"#/users/" + reviewer.id}>{reviewer.username}</a> rated it <strong>{review.rating}</strong></h3>
	        <p className="review-body"> {review.body} </p>
	       </div>
      </div>
    );
  }
});

module.exports = Review;
