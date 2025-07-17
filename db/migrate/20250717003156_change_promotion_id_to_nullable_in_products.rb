class ChangePromotionIdToNullableInProducts < ActiveRecord::Migration[7.2]
  def change
    change_column_null :products, :promotion_id, true  # Allow promotion_id to be NULL
  end
end
