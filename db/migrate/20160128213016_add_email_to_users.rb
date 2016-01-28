class AddEmailToUsers < ActiveRecord::Migration
  def change
    add_cloumn :users, :email, :string
  end
end
