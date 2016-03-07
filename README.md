#[GoodMOOCs][live]!
[live]: http://www.goodmoocs.com/

[![Login Page](./app/assets/images/githubss.png)](http://www.goodmoocs.com)


## Overview

GoodMOOCs is an online course discovery app, built with React/Flux and Ruby on Rails with postgreSQL.

### What is a MOOC?
A MOOC is a Massive Open Online Course, an industry that has exploded over the past few years to bring the highest quality educational opportunities to your home computer. Anyone can register for any course, which are often taught by faculty from prestigious universities around the world, other times from industry professionals.

#### This App
My app "GoodMOOCs" is inspired by Goodreads, in both its purpose and design. I substituted the content with courses, but include nearly every feature, such as suggestions based on course rating, suggestions based on course subjects, and a search for specific courses.

### Features

#### Singe Page App
With React and Flux architecture I was able to build my app as a single page site. React enables communication between the front and the backend to 'react' to user activity, to update itself with new data, and quickly render elements of the app in the browser.

#### Authentication
With Rails and BCrypt, I encrypt and store user's information, and their current logged in status.

#### Omni-Authentication
Users may log in with their facebook credentials, with help from the omniauth gem and facebook.

#### Search
Implemented with the PgSearch and kaminari gems, users can query the database for courses by title and users by name and see all matching results.

#### File Upload
Feature implemented with Paperclip and figaro.Users can upload pictures for their profile from their local directory, to be stored with other user data, and see a live updating preview.

#### AWS
Images stored for the layout, and images uploaded by users are stored in an Amazon Web Services S3 bucket. 

#### Development warning
Please be aware that some parts of this app are still under development, so the site will experience periodical database wipes.



