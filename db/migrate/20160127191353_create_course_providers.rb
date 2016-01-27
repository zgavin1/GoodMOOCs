class CreateCourseProviders < ActiveRecord::Migration
  def change
    create_table :course_providers do |t|
      t.string :name, null: false
      t.string :home_url, null: false

      t.timestamps
    end

    add_index :course_providers, :name
    add_index :course_providers, :home_url
  end
end
