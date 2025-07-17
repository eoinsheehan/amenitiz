class RemovePromotionCodeFromProducts < ActiveRecord::Migration[7.2]
  def change
    remove_column :products, :promotion_code, :string
  end
end
