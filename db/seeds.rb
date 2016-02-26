require 'net/http'
require 'json'



User.destroy_all


zachgavin = User.create!(username: "Zach G", password: "zgavin1", email: "gavinzach@gmail.com", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/IMG_2102.jpg")
michaelscott = User.create!(username: "Michael Scott", password: "dundermifflin", email: "worldsbestboss@gmail.com", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/mscott.jpg")
homer = User.create!(username: "Homer Simpson", password: "duffbeer", email: "mmmdonuts@yahoo.com", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/homer.jpg")
bilbo = User.create!(username: "Bilbo Baggins", password: "myprecious", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/bilbo.png")
barrybonds = User.create!(username: "Barry Bonds", password: "homerunking", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/bbonds.jpg")
spongebob = User.create!(username: "Spongebob Squarepants", password: "bikinibottom", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/spongebob.png")
jonsnow = User.create!(username: "Jon Snow", password: "secrettarg", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/jsnow.jpg")
kanyewest = User.create!(username: "Kanye West", password: "nomorepartiesinla", avatar: "https://s3.amazonaws.com/goodmoocs-seeds/kanye-west.jpg")




CourseProvider.destroy_all

udacity = CourseProvider.create!(
  name: "Udacity",
  home_url: "https://www.udacity.com/"
)

edx = CourseProvider.create!(
  name: "edX",
  home_url: "https://www.edx.org/"
)

udemy = CourseProvider.create!(
  name: 'Udemy',
  home_url: "https://www.udemy.com/"
)

coursera = CourseProvider.create!(
  name: 'Coursera',
  home_url: "https://www.coursera.org/"
)

treehouse = CourseProvider.create!(
  name: "Treehouse",
  home_url: "https://teamtreehouse.com"
)

futurelearn = CourseProvider.create!(
  name: "FutureLearn",
  home_url: "https://www.futurelearn.com/",
)

Course.destroy_all

url = "https://www.udacity.com/public-api/v0/courses"
response = Net::HTTP.get(URI.parse(url))
json_response = JSON.parse(response)

json_response["courses"].each do |course|
    Course.create!(
      title: course["title"],
      description: course["short_summary"] || "No summary.",
      course_url: course["homepage"],
      cost: 0,
      start_date: DateTime.now,
      course_provider_id: udacity.id,
      subject: "programming",
      image: course["image"]
    )
end



course1 = Course.create!(
  title: "Intro to Statistics",
  description: "Learn the core concepts of statistics, like calculating probability, and analyzing a set of data.",
  cost: 0,
  course_url: "https://www.udacity.com/courses/st101",
  start_date: DateTime.now,
  course_provider_id: CourseProvider.first.id,
  subject: "statistics",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/stats.jpg"
)

course2 = Course.create!(
  title: "How to Write a Novel– Part 1: Plan & Outline",
  description: "Learn the fundamentals of story structure from our MFA program faculty and complete a detailed, scene-by-scene outline.",
  cost: 250.00,
  course_url: "https://www.edx.org/course/how-write-novel-part-1-plan-outline-ubcx-cw1-1x",
  start_date: DateTime.new(2016, 1, 20),
  course_provider_id: CourseProvider.first.id,
  subject: "writing",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/OnceUponATime.jpg"
)

course3 = Course.create!(
  title: "R-Programming",
  description: "In this course you will learn how to program in R and how to use R for effective data analysis.",
  cost: 0,
  course_url: "https://www.coursera.org/learn/r-programming",
  start_date: DateTime.new(2016, 2, 1),
  course_provider_id: coursera.id,
  subject: "programming",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/rprogramming.jpg"
)

course4 = Course.create!(
  title: "Terrorism and Counterterrorism: Comparing Theory and Practice",
  description: "Define and analyze the essence of terror as an instrument and overview of the state of terrorism in our world.",
  cost: 100.00,
  course_url: "https://www.coursera.org/learn/terrorism/",
  start_date: DateTime.new(2016, 2, 8),
  course_provider_id: coursera.id,
  subject: "political science",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/terrorism-2.jpg"
  )

course5 = Course.create!(
  title: "Photography Masterclass",
  description: "This course is designed to teach you the ins and outs of photography, even if you have little to no experience with it, to help create profitable images that help you stand out from the crowd and sell.",
  cost: 24.00,
  course_url: "https://www.udemy.com/photography-masterclass-your-complete-guide-to-photography/",
  start_date: DateTime.now,
  course_provider_id: udemy.id,
  subject: "photography",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/photography.jpg"
  )

course6 = Course.create!(
  title: "Java for Beginners",
  description: "Learn to program in the Java programming language. This course assumes no prior programming knowledge, just a desire to learn to program.",
  cost: 0.00,
  course_url: "https://www.udemy.com/java-tutorial/",
  start_date: DateTime.now,
  course_provider_id: udemy.id,
  subject: "programming",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/javacode.jpg"
  )

course8 = Course.create!(
  title: "Start Up Guide",
  description: "How to easily create a US Company from the comfort of your home, be it the US or elsewhere avoiding expensive legal fees.",
  cost: 24.00,
  course_url: "https://www.udemy.com/how-to-set-up-and-run-a-us-company/",
  start_date: DateTime.now,
  course_provider_id: udemy.id,
  subject: "business",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/business-runner.jpg"
  )

course9 = Course.create!(
  title: "App Marketing",
  description: "This course will help you organize a strategy of identifying your perfect user, find ways to connect with them and what you’ll say when you find them.",
  cost: 0.00,
  course_url: "https://www.udacity.com/courses/ud719",
  start_date: DateTime.now,
  course_provider_id: udacity.id,
  subject: "business",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/app-marketing-101.png"
  )


course10 = Course.create!(
  title: "Intro to Relational Databases",
  description: "You’ll learn the basics of SQL (the Structured Query Language) and database design, as well as the Python API for connecting Python code to a database.",
  cost: 0.00,
  course_url: "https://www.udacity.com/courses/ud197",
  start_date: DateTime.now,
  course_provider_id: udacity.id,
  subject: "programming",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/relation-db.jpg"
  )


course11 = Course.create!(
  title: "JavaScript Promises",
  description: "Learn how to handle asynchronous work with ease! In this course, you’ll use Native JavaScript Promises to write asynchronous code that is easy to read, easy to write and easy to debug.",
  cost: 0.00,
  course_url: "https://www.udacity.com/course/javascript-promises--ud898",
  start_date: DateTime.now,
  course_provider_id: udacity.id,
  subject: "programming",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/js-promise.png"
)
course12 = Course.create!(
  title: "Italian Language and Culture: Advanced",
  description: "Enhance your knowledge of the Italian language and learn about Italy’s culture and history including theater, opera and the poet Dante.",
  cost: 50.00,
  course_url: "https://www.edx.org/course/italian-language-culture-advanced-wellesleyx-italian3x",
  start_date: DateTime.now,
  course_provider_id: edx.id,
  subject: "language",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/1_roman-colosseum.jpg"
)

course13 = Course.create!(
  title: "Italian Language and Culture: Intermediate",
  description: "Improve your Italian language skills and expand your vocabulary while you learn about Italian art, literature and contemporary society.",
  cost: 50.00,
  course_url: "https://www.edx.org/course/italian-language-culture-intermediate-wellesleyx-italian2x",
  start_date: DateTime.now,
  course_provider_id: edx.id,
  subject: "language",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/italy_sculpture.jpg"
)

course14 = Course.create!(
  title: "Italian Language and Culture: Beginner",
  description: "Learn the basics of the Italian language and culture through videos, podcasts, interviews, and much more.",
  cost: 50.00,
  course_url: "https://www.edx.org/course/italian-language-culture-beginner-wellesleyx-italian1x",
  start_date: DateTime.now,
  course_provider_id: edx.id,
  subject: "language",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/venice-italy.jpg"
)

course15 = Course.create!(
  title: "Basic Mandarin Chinese – Level 1",
  description: "Take the first step towards learning Mandarin Chinese, the most commonly spoken language in the world. ",
  cost: 50.00,
  course_url: "https://www.edx.org/course/basic-mandarin-chinese-level-1-mandarinx-mx101x",
  start_date: DateTime.now,
  course_provider_id: edx.id,
  subject: "language",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/mandarin1.jpg"
)

course16 = Course.create!(
  title: "Basic Mandarin Chinese – Level 2",
  description: "Learn Mandarin Chinese with practice in extensive vocabulary, phrases and sentence structures used in daily communication in Mandarin Chinese.",
  cost: 50.00,
  course_url: "https://www.edx.org/course/basic-mandarin-chinese-level-2-mandarinx-mx102x",
  start_date: DateTime.now,
  course_provider_id: edx.id,
  subject: "language",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/mandarin_2003767c.jpg"
)

course17 = Course.create!(
  title: "Preparing for the AP English Language and Composition Exam",
  description: "This course focuses on the development and revision of evidence-based analytic and argumentative writing and the rhetorical analysis of nonfiction texts.",
  cost: 25.00,
  course_url: "https://www.edx.org/course/preparing-ap-english-language-tennessee-board-regents-engcompx",
  start_date: DateTime.now,
  course_provider_id: edx.id,
  subject: "test prep",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/apenglish.jpg"
  )

course18 = Course.create!(
  title: "Introduction to Dutch",
  description: "Learn to speak, write and understand basic Dutch, with this free, three-week, introductory foreign language course.",
  cost: 0.00,
  course_url: "https://www.futurelearn.com/courses/dutch?utm_campaign=Courses+feed&utm_medium=courses-feed&utm_source=courses-feed",
  start_date: DateTime.now,
  course_provider_id: futurelearn.id,
  subject: "language",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/dutch.jpg"
  )

course19 = Course.create!(
  title: "Computer Science 101",
  description: "Introduction to Computer Science for a zero-prior-experience audience. Play with little phrases of code to understand what computers are all about.",
  cost: 0,
  course_url: "https://www.coursetalk.com/providers/stanford-online/courses/computer-science-101-1",
  start_date: DateTime.now,
  course_provider_id: udacity.id,
  subject: "programming",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/cs101.png"
)

course20 = Course.create!(
  title: "Object-Oriented JavaScript",
  description: " In this course we'll build a couple of projects to get a handle on creating your own objects.",
  course_url: "https://www.coursetalk.com/providers/treehouse/courses/object-oriented-javascript-3",
  cost: 100.00,
  start_date: DateTime.now,
  course_provider_id: treehouse.id,
  subject: "programming",
  image: "https://s3.amazonaws.com/goodmoocs-seeds/OOP-in-JS.png"
)

# course21 = Course.create!(
#   )

Review.destroy_all

Review.create!(
  user_id: michaelscott.id,
  course_id: course3.id,
  rating: 4,
  body: "They wouldn't let me just write lyrics! I'm a musician, that's my PROFESSION."
)

Review.create!(
  user_id: homer.id,
  course_id: course1.id,
  rating: 1,
  body: "I understood some of the words."
)

Review.create!(
  user_id: zachgavin.id,
  course_id: course1.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: zachgavin.id,
  course_id: course2.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: zachgavin.id,
  course_id: course3.id,
  rating: 2,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: zachgavin.id,
  course_id: course12.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: zachgavin.id,
  course_id: course13.id,
  rating: 2,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: zachgavin.id,
  course_id: course14.id,
  rating: 3,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: zachgavin.id,
  course_id: course15.id,
  rating: 4,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
rev3 = Review.create!(
  user_id: zachgavin.id,
  course_id: course16.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)

Review.create!(
  user_id: zachgavin.id,
  course_id: course20.id,
  rating: 4,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)






Review.create!(
  user_id: bilbo.id,
  course_id: course1.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course3.id,
  rating: 3,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)


Review.create!(
  user_id: bilbo.id,
  course_id: course4.id,
  rating: 5,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course5.id,
  rating: 1,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course6.id,
  rating: 3,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)

Review.create!(
  user_id: bilbo.id,
  course_id: course8.id,
  rating: 4,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)

Review.create!(
  user_id: bilbo.id,
  course_id: course9.id,
  rating: 5,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course10.id,
  rating: 1,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course11.id,
  rating: 1,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course12.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: bilbo.id,
  course_id: course13.id,
  rating: 5,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: bilbo.id,
  course_id: course14.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course15.id,
  rating: 2,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
rev3 = Review.create!(
  user_id: bilbo.id,
  course_id: course16.id,
  rating: 2,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course17.id,
  rating: 5,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: bilbo.id,
  course_id: course18.id,
  rating: 2,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: bilbo.id,
  course_id: course19.id,
  rating: 2,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: bilbo.id,
  course_id: course20.id,
  rating: 5,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)





Review.create!(
  user_id: kanyewest.id,
  course_id: course1.id,
  rating: 2,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course3.id,
  rating: 3,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)


Review.create!(
  user_id: kanyewest.id,
  course_id: course4.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course5.id,
  rating: 5,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course6.id,
  rating: 4,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)

Review.create!(
  user_id: kanyewest.id,
  course_id: course8.id,
  rating: 3,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)

Review.create!(
  user_id: kanyewest.id,
  course_id: course9.id,
  rating: 5,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course10.id,
  rating: 3,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course11.id,
  rating: 3,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course12.id,
  rating: 3,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)


Review.create!(
  user_id: kanyewest.id,
  course_id: course14.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course15.id,
  rating: 2,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
rev3 = Review.create!(
  user_id: kanyewest.id,
  course_id: course16.id,
  rating: 2,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course17.id,
  rating: 5,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course18.id,
  rating: 2,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: kanyewest.id,
  course_id: course19.id,
  rating: 2,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: kanyewest.id,
  course_id: course20.id,
  rating: 3,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)





Review.create!(
  user_id: barrybonds.id,
  course_id: course1.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course3.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)


Review.create!(
  user_id: barrybonds.id,
  course_id: course4.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course5.id,
  rating: 3,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course6.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)

Review.create!(
  user_id: barrybonds.id,
  course_id: course8.id,
  rating: 4,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)

Review.create!(
  user_id: barrybonds.id,
  course_id: course9.id,
  rating: 2,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course10.id,
  rating: 1,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course11.id,
  rating: 1,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course12.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course13.id,
  rating: 5,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: barrybonds.id,
  course_id: course14.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course15.id,
  rating: 2,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
rev3 = Review.create!(
  user_id: barrybonds.id,
  course_id: course16.id,
  rating: 2,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course17.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: barrybonds.id,
  course_id: course18.id,
  rating: 3,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: barrybonds.id,
  course_id: course19.id,
  rating: 3,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)



Review.create!(
  user_id: jonsnow.id,
  course_id: course3.id,
  rating: 3,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)


Review.create!(
  user_id: jonsnow.id,
  course_id: course8.id,
  rating: 2,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)

Review.create!(
  user_id: jonsnow.id,
  course_id: course9.id,
  rating: 2,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course10.id,
  rating: 1,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course11.id,
  rating: 1,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course12.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course13.id,
  rating: 2,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: jonsnow.id,
  course_id: course14.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course15.id,
  rating: 1,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
rev3 = Review.create!(
  user_id: jonsnow.id,
  course_id: course16.id,
  rating: 1,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course17.id,
  rating: 1,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course18.id,
  rating: 1,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: jonsnow.id,
  course_id: course19.id,
  rating: 2,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: jonsnow.id,
  course_id: course20.id,
  rating: 4,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)



Review.create!(
  user_id: spongebob.id,
  course_id: course1.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course3 .id,
  rating: 5,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)

Review.create!(
  user_id: spongebob.id,
  course_id: course4.id,
  rating: 5,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course5.id,
  rating: 5,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course6.id,
  rating: 5,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)

Review.create!(
  user_id: spongebob.id,
  course_id: course8.id,
  rating: 4,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)

Review.create!(
  user_id: spongebob.id,
  course_id: course9.id,
  rating: 2,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course10.id,
  rating: 3,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)


Review.create!(
  user_id: spongebob.id,
  course_id: course14.id,
  rating: 4,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course15.id,
  rating: 2,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
rev3 = Review.create!(
  user_id: spongebob.id,
  course_id: course16.id,
  rating: 4,
  body: "I'm course tester and this was a fantastic course. Udacity does a great job, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course17.id,
  rating: 5,
  body: "I'm course tester and this was a awful course. I wrote a great novel with edX's instruction."
)
Review.create!(
  user_id: spongebob.id,
  course_id: course18.id,
  rating: 5,
  body: "I'm course tester and this was a bad course. Coursera does a great job teaching R, and this is an intersting topic"
)


Review.create!(
  user_id: spongebob.id,
  course_id: course19.id,
  rating: 5,
  body: "I'm course tester and this was an okay course. Coursera does a great job discussing terrorism, and this is an intersting topic"
)
Review.create!(
  user_id: spongebob.id,
  course_id: course20.id,
  rating: 5,
  body: "I'm course tester and this was a good course. Udemy does a great job teaching Photography, and this is an intersting topic"
)
