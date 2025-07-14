class AddPromotionCodeToProducts < ActiveRecord::Migration[7.2]
  def change
    add_column :products, :promotion_code, :string
  end
end
