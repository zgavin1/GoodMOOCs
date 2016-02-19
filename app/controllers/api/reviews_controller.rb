class Api::ReviewsController < ApplicationController
  def show
    @review = Review.find(params[:id])
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render 'api/reviews/show'
    else
      render json: ["Could not save your review!"], status: 401
    end
  end

  def new
    @review = Review.new
  end

  def index
    @reviews = Review.all.includes(:course, :user)
  end

  private
  def review_params
    params.require(:review).permit(:user_id, :course_id, :rating, :body)
  end
end
