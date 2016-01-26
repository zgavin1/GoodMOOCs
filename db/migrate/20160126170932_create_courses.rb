class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.decimal :cost, null: false
      t.string :url, null: false
      t.datetime :start_date, null: false


      t.timestamps
    end

    add_index :courses, :title
  end
end
