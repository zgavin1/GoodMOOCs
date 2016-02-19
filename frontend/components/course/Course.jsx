var React = require('react');
var ReactRouter = require('react-router');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ReviewApiUtil = require('./../../util/review_api_util');
var SessionsApiUtil = require('./../../util/sessions_api_util');

var CurrentUserStore = require('./../../stores/currentUser');
var ReviewStore = require('./../../stores/review');
var CourseStore = require('./../../stores/course');
var CourseIndexItem = require('./CourseIndexItem');
var StarRating = require('./../Stars');

var History = require('react-router').History

var Course = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      rating: 5,
    };
    // Need to use LinkedStateMixin to connect
    // this and the number of starrs hovered
  },

  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this._onChange);
    SessionsApiUtil.fetchCurrentUser();
  },

  _onChange: function () {
    this.setState({ current_user_id: CurrentUserStore.currentUser().id });
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
  },

  componentWillReceiveProps: function () {

  },

  submitRating: function (e) {
    // e.preventDefault();

    // var rev =
    //   { review:
    //     {
    //       rating: this.state.rating,
    //       user_id: this.context.currentUser.id,
    //       course_id: this.props.course.id
    //     }
    //   }

    // ReviewApiUtil.postReview(rev)
  },

  _newReview: function (e) {
    // e.preventDefault();

    // var id = this.props.course.id

    // this.history.pushState({course_id: id}, "/reviews/new")
  },

  currentUserRating: function () {
    var rating = 0;

    this.context.currentUser.reviews.forEach(function (review) {
      if (this.props.course.id === review.course_id) {
        return rating = review.rating;
      }
    }.bind(this));
    return rating;
  },

  // avgRating: function () {
  //   parseFloat(Math.ceil(this.props.course.average_rating * 100) / 100);
  // },

  render: function () {
    var course = this.props.course;
    if ($.isEmptyObject(course)) {
      return (<div></div>);
    }

    var num_reviews = 0;
    for (var i = 0; i < course.reviews.length; i++) {
      if (course.reviews[i].body) {
        num_reviews += 1;
      }
    }

    var avgRating = parseFloat(Math.ceil(course.average_rating * 100)/100);

    var related_courses = this.props.related_courses.map(function (course) {
      return <CourseIndexItem key={course.id} className="related-course" course={course} />
    });

    var cost = course.cost
    if (cost == 0) {
      cost = "Free";
    } else {
      cost = "$" + cost + "0"
    }

    var reviewText;
    if (this.currentUserRating() > 0) {
      reviewText = "Reviewed";
    } else {
     reviewText = "Review";
    }

    return (
      <div className="course-show-body group">
        <div className="course-show-left group">
          <div className="course-img-col group">
            <img className="course-img" src={course.image_url}/>
            <div className="want-to-read-menu">
              <a onClick={this.props.handleNewReview} className="want-to-read">{reviewText}</a>
            </div>
            <div className="rating-container">
              <p>Rate this Course</p>
              <StarRating static={ false } rating={ this.currentUserRating() } />
            </div>
          </div>
          <div className="course-info-col">
            <h1 className="course-title">{ course.title }</h1>
            from <h3 className="course-provider-name">
              <a href="#">
                { course.course_provider.name }
              </a>
            </h3>
            <br/>
            <div className="rating-stats">
              <StarRating static={ true } rating={ avgRating } />
               <dot>·</dot>
              <a>avg rating: {avgRating}</a>
               <dot>·</dot>
              <a>{course.reviews.length} Ratings</a>
               <dot>·</dot>
              <a>{num_reviews} Reviews</a>
            </div>
            <p>{course.description}</p>
            <div className="course-info-enrollment">
              <p> <a className="enrollment-link" href={course.course_url}>Enroll at {course.course_provider.name}: {cost}</a></p>
            </div>
          </div>

        </div>

        <div className="course-show-right">
          <h3> If you like <strong>{course.subject}</strong> courses... </h3>
          <div className="course-show-relateds group">
            { related_courses }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Course;
