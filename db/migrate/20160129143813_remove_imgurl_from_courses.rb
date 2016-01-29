class RemoveImgurlFromCourses < ActiveRecord::Migration
  def change
    remove_column :courses, :img_url
  end
end
