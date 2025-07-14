FactoryBot.define do
  factory :product do
    code { Faker::Number.between(from: 1, to: 1000) }
    name { Faker::Commerce.product_name }
    description { Faker::Lorem.paragraph }
    promotion_code { nil }
  end
end
