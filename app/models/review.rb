class Review < ActiveRecord::Base
  validates :user_id, :course_id, :rating, presence: true
  validates :rating, :inclusion => { :in => 0..5, allow_nil: true }
  validates_uniqueness_of :user_id, :scope => [:course_id]

# validates user_id over course_id
  belongs_to :course
  belongs_to :user

end
