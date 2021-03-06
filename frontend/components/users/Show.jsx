var React = require('react');
var UserStore = require('./../../stores/user');
var CurrentUserStore = require('./../../stores/currentUser');
var UsersApiUtil = require('./../../util/user_api_util');

var Ads = require('./../CourseAds');

var UserShow = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

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

  componentWillReceiveProps: function (newProps) {
    UsersApiUtil.fetchUser(parseInt(newProps.params.id));
  },

	getStateFromStore: function () {
		return {
			user: UserStore.findUserById(parseInt(this.props.params.id))
		};
	},

  render: function () {
    var user = this.state.user;
    if (!(user && user.courses)) {
      return <div></div>;
    }
    var user_ratings = user.reviews || [];
    var ratings_total = 0;
    for (var i = 0; i < user_ratings.length; i++) {
      ratings_total += user_ratings[i].rating;
    }
    var average_rating = parseFloat(Math.ceil((ratings_total / user_ratings.length) * 100)/100);
		var user_reviews_count = 0;
    for (var j = 0; j < user_ratings.length; j++) {
      if (user_ratings[j].body) {
        user_reviews_count += 1;
      }
    }

    var onCurrentUserProfile = (this.context.currentUser.id === user.id);
    var edit_permission;
    var user_info_courses;
    if (onCurrentUserProfile) {
      edit_permission = <a href={ "#/users/" + user.id + "/edit" } className="user-show-hover edit-button">(edit profile)</a>;

      user_info_courses =
        <div className="user-info-courses group">
          <a className="user-link-to-reviews" href="#/reviews"> See My Reviews </a>
        </div>;
    } else {
      var demo_courses = user.courses.slice(0, 10).map(function (course) {
        return <a key={course.course_id} href={"#/courses/" + course.course_id}><img className="user-info-courses-img" src={ course.course_img } /></a>;
      }.bind(this));

      user_info_courses =
        <div className="user-info-courses group">
          <div className="user-info-courses-headline group">{ user.username + "'s"} Courses</div>
          { demo_courses }
        </div>;
    }

    var rawDate = new Date(user.created_at).toDateString().split(" "); // ["Mon", "Feb", "08," "2016"]
    var joinDate = rawDate[1] + " " + rawDate[2] + ", " + rawDate[3]

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
              <h2 className="username">{user.username} { edit_permission } </h2>
              <h3><strong>Joined:</strong> {joinDate}</h3>
            </div>
          </div>
          { user_info_courses }
        </div>
        
        <Ads />
      </div>
    );
  }

});

module.exports = UserShow;
