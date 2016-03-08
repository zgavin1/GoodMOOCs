var React = require('react');
var CourseStore = require('./../../stores/course');
var ReviewStore = require('./../../stores/review');
var ApiUtil = require('./../../util/api_util');
var Review = require('./../review/Review');
var ReviewForm = require('./../review/ReviewForm');

var CurrentUserStore = require('./../../stores/currentUser');

var Course = require('./Course');

var CourseShow = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId) || {};
    return {
      course: course,
      avg_rating: course.avg_rating,
      reviews: course.reviews,
      showReviewForm: false,
      starRating: 0
     };
  },

  _findCourseById: function (id) {
    var output;
    CourseStore.all().forEach(function (course) {
      if (id === course.id) {
        output = course;
      }
    }.bind(this));

    return output;
  },

  componentDidMount: function () {
    ApiUtil.fetchCourses();
    this.courseListener = CourseStore.addListener(this._courseChange);
    this.reviewsListener = ReviewStore.addListener(this._reviewAdded);
  },

  _reviewAdded: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId);
    this.setState({avg_rating: course.average_rating, reviews: course.reviews});
  },

  _courseChange: function () {
    var courseId = parseInt(this.props.params.courseId);
    var course = this._findCourseById(courseId);
    this.setState({ course: course, avg_rating: course.average_rating, reviews: course.reviews });
  },

  componentWillUnmount: function () {
    this.courseListener.remove();
    this.reviewsListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchCourse(parseInt(newProps.params.courseId));
  },

  courseReviews: function () {
    var courseReviews = this.state.reviews
    courseReviews = courseReviews.map(function (review) {
      return (
        <Review review={review} key={review.id} />
      )
    }.bind(this));

    return courseReviews;
  },

  currentUserHasReviewed: function () {
    var currentUsersCourses = this.context.currentUser.courses.map(function (course) {
      return course.course_id;
    });

    return currentUsersCourses.includes(this.state.course.id);
  },

  currentUserRating: function () {
    var rating = 0;
    if (this.state.starRating > 0) {
      return this.state.starRating;
    }
    this.context.currentUser.reviews.forEach(function (review) {
      if (this.state.course.id === review.course_id) {
        return rating = review.rating;
      }
    }.bind(this));
    return rating;
  },

  handleNewReview: function (rating) {
    if (Object.keys(this.context.currentUser).length === 0) {
      alert("Log in or sign up to review courses!");
      return;
    }

    if (this.currentUserHasReviewed()) {
      alert("You have already reviewed this course!");
      return;
    }
    
    if (rating) {
      this.setState({starRating: rating, showReviewForm: true})
    } else {
      this.setState({showReviewForm: true});
    }
  },

  hideReviewForm: function () {
    this.setState({showReviewForm: false});
  },


  render: function () {
    var related_courses = CourseStore.all().filter(function (course) {
      if (this.state.course.subject === course.subject && this.state.course.id !== course.id) {
        return true;
      } else {
        return false;
      }
    }.bind(this));

    if (Object.keys(this.state.course).length === 0) {
      return (<div></div>)
    }

    var reviewForm = (<div></div>);

    if (this.state.showReviewForm) {
      reviewForm = (
        <div className="review-form-container">
          <ReviewForm
            rating={ this.currentUserRating() } 
            course={ this.state.course }
            reviewFormClose={ this.hideReviewForm } />
        </div>
      )
    }

    return (
      <div className="course-show-body">
        <Course
          course={ this.state.course }
          related_courses={ related_courses }
          avg_rating={ this.state.avg_rating }
          handleNewReview={ this.handleNewReview }/>

        { reviewForm }

        <section className="course-reviews">
          <h3 className="course-review-header">Community Reviews</h3>

          { this.courseReviews() }
        </section>
      </div>
    );
  }
});

module.exports = CourseShow;
