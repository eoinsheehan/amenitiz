# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

discount_33 = Promotion.create(discount: 0.3333, code: "DIS33", threshold: 3, description: "33% price reduction when you buy three or more of this product.")
discount_10 = Promotion.create(discount: 0.1, code: "DIS10", threshold: 3, description: "10% price reduction when you buy three or more of this product.")
bogo = Promotion.create(code: "BOGO", description: "Buy one get one free on green tea products courtesy of the CEO.")
Product.create(name: "Green tea", description: Faker::Lorem.paragraphs(number: 4).join("\n\n"), price: 3.11, code: "GT1", promotion_id: bogo.id)
Product.create(name: "Coffee", description: Faker::Lorem.paragraphs(number: 4).join("\n\n"), price: 11.23, code: "CF1", promotion_id: discount_33.id)
Product.create(name: "Strawberries", description: Faker::Lorem.paragraphs(number: 4).join("\n\n"), price: 5.00, promotion_id: discount_10.id, code: "SR1")
