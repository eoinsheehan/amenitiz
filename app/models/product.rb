class Product < ApplicationRecord
  belongs_to :promotion, optional: true
  validates :price, presence: true, numericality: {greater_than: 0}
end
