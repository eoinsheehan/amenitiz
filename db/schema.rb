# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_07_17_004459) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.text "description"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
    t.bigint "promotion_id"
    t.index ["code"], name: "index_products_on_code", unique: true
    t.index ["promotion_id"], name: "index_products_on_promotion_id"
  end

  create_table "promotions", force: :cascade do |t|
    t.text "description"
    t.float "discount"
    t.integer "threshold"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
    t.index ["code"], name: "index_promotions_on_code", unique: true
  end

  add_foreign_key "products", "promotions"
end
