class Course < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title]

  has_attached_file :image, default_url: "stats.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :title, :description, :cost, :course_url, :start_date, :course_provider_id, :subject, presence: true

  belongs_to :course_provider

  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user

  def average_rating
    reviews.average(:rating).to_f
  end

end
