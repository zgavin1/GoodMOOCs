# To add to app.yml on each clone

development:
  s3_bucket: "goodmoocs-dev"

production:
  s3_bucket: "goodmoocs-prod"

s3_access_key_id: "XXXX"
s3_secret_access_key: "XXXX"

#heroku command to run
figaro heroku:set -e production

# GoodMoocs



[Heroku link][heroku] **NB:** This should be a link to your production site
- Working link to be added during first day of capstones.

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

"GoodMoocs" is a clone of GoodReads built using Ruby on Rails
and React.js. GoodMoocs allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
<!-- - [ ] Create courses (still deciding whether or not to include this) -->
- [ ] Review, rate, tag MOOCs (online courses) by different criteria.
- [ ] Track courses with a wishlist.
- [ ] Set course reminders (registration, start, and due/dates).
- [ ] Have courses suggested to users based on past ratings.
- [ ] Chat with other users.

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: https://cacoo.com/diagrams/Rhs9A3tZdQb93eYq#8BBCE
[schema]: ./docs/schema.md

## Implementation Timeline





## Below is sample imp. timeline, keeping for reference, will update with my info soon.

### Phase 1: User Authentication, Course and Course Review models and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
containers for the application's root React component, the suggested courses,
and and enrolled courses. I will create models for courses and course reviews.

<!-- [Details][phase-one] -->

### Phase 2: Flux Architecture and Course Review CRUD (2.5 days)

At the end of phase two, users should be able to sign in, review a course, and have suggested courses based on their other reviews.

### Will write the rest of the phases when I have more information.
<!--
[Details][phase-two]

### Phase 3: Enrolled course updating/association Courses and Tags (2 days)

Phase 3 adds organization to the user/course interface. Enrolled courses belong to a user and a course, which has
its own `Index` view. Create JSON API for Course Enrollment. Notes can also now be
tagged with multiple tags. Users can bring up notes in a separate `SearchIndex`
view by searching for their tags. Once the tag search is implemented, I will
extend this to a fuzzy search through every Note's content.

[Details][phase-three]


### Phase 5: Reminders and Garbage Collection (1 day)

Phase 5 introduces two new features. First, users can set reminders on notes
which will at the time they are set for prompt the user to review and edit the
given note. In addition, I will implement a feature that asks users to review
notes once they reach a certain age and ask whether they should be kept,
archived, or deleted.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now, but in
Phase 6 I will add styling flourishes and make modals out of some elements (like
the NotebookForm).

### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Use javascript library for cleaner tag selection
- [ ] Changelogs for Notes
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->
