var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _courses = {};
var CourseStore = new Store(AppDispatcher);

CourseStore.all = function () {
  var courses = [];
  for (var id in _courses) {
    courses.push(_courses[id]);
  }
  return courses;
};

resetCourses = function (coursesArray) {
  var _courses = {};
  coursesArray.forEach(function (course) {
    _courses[course.id] = course;
  });
};

CourseStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CourseConstants.COURSES_RECEIVED:
      resetCourses(payload.courses);
      CourseStore.__emitChange();
      break;
  }
};

module.exports = CourseStore;
