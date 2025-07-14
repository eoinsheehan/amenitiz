FactoryBot.define do
  factory :promotion do
    code { Faker::Number.between(from: 1, to: 1000) }
    description { Faker::Lorem.paragraph }
    discount { nil }
    threshold { nil }
  end
end
