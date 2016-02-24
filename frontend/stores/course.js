var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _courses = {};
var CourseStore = new Store(AppDispatcher);
var CourseConstants = require('../constants/course_constants');

CourseStore.all = function () {
  var courses = [];
  for (var id in _courses) {
    courses.push(_courses[id]);
  }

  return courses;
};

// CourseStore.getTwenty = function () {
//   var courses = [];

//   var count = Object.keys(_courses).length;

//   for (var i = 0; i < 20; i++) {
    
//   }
// }

var resetCourses = function (coursesArray) {
  _courses = {};
  coursesArray.forEach(function (course) {
    _courses[course.id] = course;
  });
};

var _addCourse = function (course) {
  _courses[course.id] = course;
};

CourseStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CourseConstants.COURSES_RECEIVED:
      resetCourses(payload.courses);
      CourseStore.__emitChange();
      break;
    case CourseConstants.COURSE_RECEIVED:
      _addCourse(payload.course);
      CourseStore.__emitChange();
      break;
  }
};

module.exports = CourseStore;
