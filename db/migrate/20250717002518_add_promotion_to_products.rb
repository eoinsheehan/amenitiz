class AddPromotionToProducts < ActiveRecord::Migration[7.2]
  def change
    add_reference :products, :promotion, null: true, foreign_key: true
  end
end
