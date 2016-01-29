class Api::ReviewsController < ApplicationController
  def show
    @review = Review.find(params[:id])
  end

  def create
  end

  def new
  end

  def index
    @courses = Course.all.includes(:course_provider)
  end
end
