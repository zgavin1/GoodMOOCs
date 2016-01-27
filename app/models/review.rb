class Review < ActiveRecord::Base
  validates :user_id, :course_id, :rating, presence: true
  validates :rating, :inclusion => { :in => 0..5, allow_nil: true }

  belongs_to :course
  belongs_to :user
end