class CreateUserGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :user_groups do |t|
      t.references :user, freign_key: true
      t.references :group, freign_key: true
      t.timestamps
    end
  end
end
