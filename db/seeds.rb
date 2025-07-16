# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Product.create(name: "Green tea", description: Faker::Lorem.paragraphs(number: 4).join("\n\n"), price: 3.11, code: "GT1", promotion_code: "BOGO")
Product.create(name: "Coffee", description: Faker::Lorem.paragraphs(number: 4).join("\n\n"), price: 11.23, code: "CF1", promotion_code: "DIS33")
Product.create(name: "Strawberries", description: Faker::Lorem.paragraphs(number: 4).join("\n\n"), price: 5.00, promotion_code: "DIS10", code: "SR1")
Promotion.create(discount: 0.3333, code: "DIS33", threshold: 3)
Promotion.create(discount: 0.1, code: "DIS10", threshold: 3)
Promotion.create(code: "BOGO", description: "Buy one get one free on green tea products courtesy of the CEO.")
