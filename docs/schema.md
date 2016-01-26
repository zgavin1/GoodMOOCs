# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## course_providers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name   		      | string    | not null, indexed, unique
website			    | string	  | not null, indexed, unique

## courses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      | not null
cost		| integer	| not null
url			| text  	| not null
start_date	| datetime	| not null
provider_id | integer   | not null, foreign key (references providers), indexed

##course_reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text 	    |
rating		| integer	| not null, max 5
author_id   | integer   | not null, foreign key references users, indexed
course_id   | integer   | not null, foreign key references course_provider, indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
course_id   | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## reminders
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
course_id   | string    | not null, foreign key (references notes), indexed
date        | datetime  | not null
type        | string    | not null
prev_id     | integer   | foreign key (references reminders), indexed
