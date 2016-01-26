class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render :show
    else
      render :new
    end
  end

  def new
    @user = User.new(params[:id])
    render :new
  end


  def show
    render :json 'show'
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
