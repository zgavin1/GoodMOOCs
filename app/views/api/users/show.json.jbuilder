json.extract! @user, :id, :username, :email
json.avatar asset_path(@user.avatar.url)
json.reviews @user.reviews
json.courses @user.courses