# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all


pw = User.create!(username: "password", password: "password")
llewyn = User.create!(username: "Llewyn Davis", password: "folkmusic")


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
  url: "https://www.udacity.com/courses/st101",
  start_date: DateTime.now,
  course_provider_id: udacity.id,
  subject: "statistics",
  img_url: "http://www.ahrinet.org/App_Content/ahri/images/Statistics/canstockphoto7351376-landingpage.jpg"
)

course1 = Course.create!(
  title: "How to Write a Novel– Part 1: Plan & Outline",
  description: "Learn the fundamentals of story structure from our MFA program faculty and complete a detailed, scene-by-scene outline.",
  cost: 250.00,
  url: "https://www.edx.org/course/how-write-novel-part-1-plan-outline-ubcx-cw1-1x",
  start_date: DateTime.new(2016, 1, 20),
  course_provider_id: edx.id,
  subject: "Writing",
  img_url: "http://massimomarinoauthor.com/wp-content/uploads/2014/07/OnceUponATime.jpg"
)
