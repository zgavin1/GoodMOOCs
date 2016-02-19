json.extract! review, :id, :rating, :body, :user_id, :course_id
json.course do
  json.id review.course.id
  json.title review.course.title
  json.course_provider review.course.course_provider
  json.avg_rating review.course.average_rating
  json.img asset_path(review.course.image.url)
end

# json.course review.course
# json.avg_rating review.course.average_rating