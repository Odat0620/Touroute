class RemoveUidFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :Uid, :string
  end
end
