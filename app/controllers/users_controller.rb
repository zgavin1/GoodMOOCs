class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render :show
    else
      render :new
    end
  end

  def new
    @user = User.new
  end

  def update
    @user = User.find(params[:id])
  end


  def show
    @user = User.find_by_id(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar)
  end
end
