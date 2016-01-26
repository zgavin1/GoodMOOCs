class Course < ActiveRecord::Base
  validates :title, :description, :cost, :null, :url, :start_date, presence: true

  def convert_cost

  end
end
