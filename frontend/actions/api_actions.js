var AppDispatcher = require('../dispatcher/dispatcher');
var CourseConstants = require('../constants/course_constants');

var ApiActions = {
  receiveCourses: function (courses) {
    AppDispatcher.dispatch({
      actionType: CourseConstants.COURSES_RECEIVED,
      courses: courses
    });
  },


};

module.exports = ApiActions;
