json.extract! @user, :id, :username, :email
json.avatar asset_path(@user.avatar.url)
json.reviews @user.reviews
json.courses @user.courses do |course|
	json.id course.id
	json.title course.title
	json.image asset_path(course.image.url)
end

