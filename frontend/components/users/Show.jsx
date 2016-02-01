var React = require('react');
var UserStore = require('./../../stores/user');
var UsersApiUtil = require('./../../util/user_api_util');

var UserShow = React.createClass({
	getInitialState: function () {
		return this.getStateFromStore();
	},

	componentDidMount: function () {
		this.userListener = UserStore.addListener(this.onChange);
    UsersApiUtil.fetchUser(this.props.params.id);
	},

	onChange: function () {
		this.setState(this.getStateFromStore());
	},

	componentWillUnmount: function () {
		this.userListener.remove();
	},

	getStateFromStore: function () {
		return {
			user: UserStore.findUserById(parseInt(this.props.params.id))
		};
	},

  render: function () {
    var user = this.state.user;
    if (!user) {
      return <div></div>;
    }

    var user_ratings = user.reviews;
    var ratings_total = 0;
    for (var i = 0; i < user_ratings.length; i++) {
      ratings_total += user_ratings[i].rating;
    }

    var average_rating = Math.ceil((ratings_total / user_ratings.length) * 10)/10;

    var user_reviews_count = 0;
    for (var j = 0; j < user_ratings.length; j++) {
      if (user_ratings[j].body.length > 1) {
        user_reviews_count += 1;
      }
    }

    return (
      <div className="user-show-content">
        <div className="user-info group">
          <div className="user-info-left group">
            <img className="user-avatar" src={user.avatar} />
            <div className="user-review-stats">
              <p className="user-show-hover">{user_ratings.length} ratings <span className="avg-rating user-show-hover">({average_rating} avg)</span></p>
              <p className="user-show-hover">{user_reviews_count} reviews</p>
            </div>
          </div>
          <div className="user-info-right group">
            <div className="user-info-details">
              <h2>{user.username} <a href={ "#/users/" + user.id + "/edit" } className="user-show-hover edit-button">(edit profile)</a></h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = UserShow;
