class RemoveNullConstraintFromReviewBody < ActiveRecord::Migration
  def change
    change_column :reviews, :body, :text, :null => true
  end
end
