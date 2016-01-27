class CoursesControllers < ApplicationController
  def show
  end

  def create
  end

  def new
  end

  def index
    course = Course.all

    @benches = benches

    render 'index'
  end
end
