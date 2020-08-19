class CreateTests < ActiveRecord::Migration[6.0]
  def up
    create_table :tests do |t|
      t.string :name, null: false
      t.boolean :funny

      t.timestamps
    end

    add_index :tests, :name, unique: true
  end

  def down
    drop_table :tests
  end
end
