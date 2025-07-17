class Promotion < ApplicationRecord
  has_many :post
  validates :discount,
    numericality: {
      greater_than_or_equal_to: 0,
      less_than_or_equal_to: 1,
      allow_nil: true
    }
end
