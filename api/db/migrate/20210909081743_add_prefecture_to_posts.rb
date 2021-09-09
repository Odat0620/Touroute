class AddPrefectureToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :Prefecture, :text
  end
end
