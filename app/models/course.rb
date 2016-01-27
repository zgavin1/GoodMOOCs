class Course < ActiveRecord::Base
  validates :title, :description, :cost, :course_url, :start_date, :course_provider_id, :subject, presence: true

  belongs_to :course_provider

end
