json.extract! user, :id, :username, :email
json.avatar asset_path(user.avatar.url)
json.reviews user.reviews
json.array! user.courses do |course|
	json.course_img asset_path(course.image.url)
	json.title course.title
end
