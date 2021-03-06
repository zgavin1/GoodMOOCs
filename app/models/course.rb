class Course < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title]

  has_attached_file :image,
    default_url: "stats.jpg",
    styles: { 
      thumb: ["140x100#", :png],
      small: ["140x125#", :png]
    }

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :title, :cost, :course_url, :start_date, :course_provider_id, :subject, presence: true

  belongs_to :course_provider

  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user

  def average_rating
    reviews.average(:rating).to_f
  end

  def chronological_reviews
    reviews.sort { |a, b| b.created_at <=> a.created_at }
  end

end
