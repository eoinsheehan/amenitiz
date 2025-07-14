class AddCodeToPromotions < ActiveRecord::Migration[7.2]
  def change
    add_column :promotions, :code, :string
    add_index :promotions, :code, unique: true
  end
end
