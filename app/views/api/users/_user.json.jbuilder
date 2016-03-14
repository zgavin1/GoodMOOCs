json.extract! user, :id, :username, :email, :created_at
json.avatar asset_path(user.avatar.url(:thumb))

