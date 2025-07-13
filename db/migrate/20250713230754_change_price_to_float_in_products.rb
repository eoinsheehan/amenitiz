class ChangePriceToFloatInProducts < ActiveRecord::Migration[7.2]
  def change
    change_column :products, :price, :float
  end
end
