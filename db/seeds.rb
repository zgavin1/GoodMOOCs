# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all


pw = User.create!(username: "password", password: "password", email: "password")
llewyn = User.create!(username: "llewyn_davis", password: "folkmusic", email: "dylanismyidol@gmail.com")
homer = User.create!(username: "homer_simpson", password: "duffbeer", email: "mmmdonuts@yahoo.com")


CourseProvider.destroy_all

udacity = CourseProvider.create!(
  name: "Udacity",
  home_url: "https://www.udacity.com/"
)

edx = CourseProvider.create!(
  name: "edX",
  home_url: "https://www.edx.org/"
)

Course.destroy_all

course1 = Course.create!(
  title: "Intro to Statistics",
  description: "Learn the core concepts of statistics, like calculating probability, and analyzing a set of data.",
  cost: 0,
  course_url: "https://www.udacity.com/courses/st101",
  start_date: DateTime.now,
  course_provider_id: udacity.id,
  subject: "statistics",
  img_url: "/app/assets/javascript/images/stats.jpg"
)

course2 = Course.create!(
  title: "How to Write a Novel– Part 1: Plan & Outline",
  description: "Learn the fundamentals of story structure from our MFA program faculty and complete a detailed, scene-by-scene outline.",
  cost: 250.00,
  course_url: "https://www.edx.org/course/how-write-novel-part-1-plan-outline-ubcx-cw1-1x",
  start_date: DateTime.new(2016, 1, 20),
  course_provider_id: edx.id,
  subject: "writing",
  img_url: "/app/assets/javascript/images/OnceUponATime.jpg"
)

Review.destroy_all

rev1 = Review.create!(
  user_id: llewyn.id,
  course_id: course2.id,
  rating: 4,
  body: "They wouldn't let me just write lyrics! I'm a musician, that's my PROFESSION."
)

rev2 = Review.create!(
  user_id: homer.id,
  course_id: course1.id,
  rating: 1,
  body: "I understood some of the words."
)

rev3 = Review.create!(
  user_id: pw.id,
  course_id: course1.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
