class Course < ActiveRecord::Base
  validates :title, :description, :cost, :null, :url, :start_date, presence: true

  def convert_cost
    
  end
end

t.string :title, null: false
t.text :description, null: false
t.decimal :cost, null: false
t.string :url, null: false
t.datetime :start_date, null: false
