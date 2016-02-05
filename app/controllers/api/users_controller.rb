class Api::UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
	end

	def index
		@users = User.all
	end

	def create
		@user = User.new(user_params);
		if @user.save
			sign_in(@user)
			render 'api/users/show'
		else
			redirect_to '/'
		end
	end

  def update
    @user = User.find(params[:id])
    debugger
    if @user.update(user_params)
      render 'api/users/show'
    else
      render 'api/users/'+ @user.id.to_s + '/edit'
    end
  end


	private
	def user_params
		params.require(:user).permit(:username, :email, :password, :avatar)
	end
end
