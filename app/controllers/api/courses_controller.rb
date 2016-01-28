class Api::CoursesController < ApplicationController
  def show
    @course = Course.find(params[:id])
  end

  def create
  end

  def new
  end

  def index
    @courses = Course.all.includes(:course_provider)
  end
end
