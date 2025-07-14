class CreatePromotions < ActiveRecord::Migration[7.2]
  def change
    create_table :promotions do |t|
      t.text :description
      t.float :discount
      t.integer :threshold

      t.timestamps
    end
  end
end
