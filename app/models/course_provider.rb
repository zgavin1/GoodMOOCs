class CourseProvider < ActiveRecord::Base
  validates :name, :home_url, presence: true

  has_many :courses

end
