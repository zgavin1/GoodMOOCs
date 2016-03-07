json.extract! course, :id, :title, :description, :cost, :course_url, :start_date, :subject, :course_provider_id
json.image_url asset_path(course.image.url(:thumb))
json.average_rating course.average_rating
json.course_provider course.course_provider
json.reviews course.chronological_reviews

