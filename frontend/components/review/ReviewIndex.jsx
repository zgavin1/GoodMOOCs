var React = require('react');
var ReactRouter = require('react-router');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ApiUtil = require('./../../util/api_util');
var ReviewApiUtil = require('./../../util/review_api_util');
var CourseApiUtil = require('./../../util/api_util')
var SessionsApiUtil = require('./../../util/sessions_api_util');

var CurrentUserStore = require('./../../stores/currentUser');
var ReviewStore = require('./../../stores/review');
var CourseStore = require('./../../stores/course');

var StarRatiing = require('./../Stars');

var ReviewIndex = React.createClass({

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      reviews: ReviewStore.all(),
      display: "tableview"
    };
  },

  componentDidMount: function () {
    ReviewApiUtil.fetchReviews();
    CourseApiUtil.fetchCourses();
    this.reviewsListener = ReviewStore.addListener(this._reviewsChanged);
  },

  _reviewsChanged: function () {
    this.setState({ reviews: ReviewStore.all() });
  },

  componentWillUnmount: function () {
    this.reviewsListener.remove();
  },


  render: function () {
    // if (!this.state.reviews || Object.keys(this.context.currentUser).length === 0) {
    //   return <div></div>;
    // }


    // var current_user = this.context.currentUser;
    // debugger
    var all_revs = ReviewStore.all().filter(function (review) {
      return review.user_id === this.context.currentUser.id;
    }.bind(this));

    var rev_rows = all_revs.map(function (rev) {
      var course = rev.course;
      var avgRating = parseFloat(Math.ceil(course.avg_rating * 100)/100);

      var provider = course.course_provider.home_url || "#";
      return (
        <tr key={rev.id} className="review-index-item">
          <td><a href={"#/courses/" + course.id}><img className="reviews-table-image" src={course.img} /></a></td>
          <td className="title-column"><a href={"#/courses/" + course.id}>{course.title}</a></td>
          <td><a href={course.course_provider.home_url}>{course.course_provider.name}</a></td>
          <td>
            <div className="rating">
              <StarRatiing static={ true } rating={ rev.rating } />
            </div>
          </td>
          <td>{avgRating}</td>
        </tr>
      );
    }.bind(this));

    var tbody = (
      <tbody className="reviews-table-body">
        { rev_rows }
      </tbody>
    )
    var no_revs = (<p></p>);
    if (rev_rows.length === 0) {
      no_revs = (<p>{"Looks like you haven't reviewed any courses yet! Feel free to submit a review just to explore the site!"}</p>);
    }

    return (
      <div className="reviews-index">
        <div className="reviews-index-header group">
          <h1><a href="#/reviews">My Courses</a></h1>
          <div className="reviews-index-header-nav">
            <input className="course-index-search" type="text" placeholder="Search to be implemented."/>
            <a href="#/reviews" > Batch Edit </a>
            <a href="#/reviews" > Settings </a>
            <a href="#/reviews" > Stats </a>
            <a href="#/reviews" > Print </a>

            <a><i className="fa fa-th-large"></i></a>
            <a><i className="fa fa-th-list"></i></a>
          </div>
        </div>
        { no_revs }
        <table className="reviews-table group">
          <thead className="reviews-table-head">
            <tr>
              <th><a>image</a></th>
              <th><a>title</a></th>
              <th><a>provider</a></th>
              <th><a>my rating</a></th>
              <th><a>avg rating</a></th>
            </tr>
          </thead>
          { tbody }
        </table>
      </div>);
  }
});

module.exports = ReviewIndex;
