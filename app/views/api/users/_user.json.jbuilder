json.extract! user, :id, :username, :email, :created_at
json.avatar asset_path(user.avatar.url)
json.courses do
  json.array! user.courses do |course|
    json.course_id course.id
    json.course_img asset_path(course.image.url)
    json.course_title course.title
  end
end
