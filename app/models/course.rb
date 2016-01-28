class Course < ActiveRecord::Base
  validates :title, :description, :cost, :course_url, :start_date, :course_provider_id, :subject, presence: true

  belongs_to :course_provider

  has_many :reviews

  def average_rating
    reviews.average(:rating).to_f
  end

end
