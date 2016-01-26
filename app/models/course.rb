class Course < ActiveRecord::Base
  validates :title, :description, :cost, :url, :start_date, presence: true
  
end
