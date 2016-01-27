class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.decimal :cost, null: false
      t.string :course_url, null: false
      t.datetime :start_date, null: false
      t.integer :course_provider_id
      t.string :subject, null: false
      t.string :img_url


      t.timestamps
    end

    add_index :courses, :title
  end
end
