class Api::ReviewsController < ApplicationController
  def show
    debugger
    @review = Course.find(params[:course][:id])
  end

  def create
  end

  def new
  end

  def index
    @courses = Course.all.includes(:course_provider)
  end
end
