class AddMultiColumnIndexToReviews < ActiveRecord::Migration
  def change
    add_index :reviews, [:user_id, :course_id], :unique => true
    add_index :reviews, :course_id
  end
end
