class CheckoutCalculator
  attr_reader :items

  def initialize(cart:)
    @items = cart[:items]
  end

  def call
    {items:, total_cost:}
  end

  private

  def total_cost
    items.sum do |item|
      item_cost(item:)
    end
  end

  def item_cost(item:)
    quantity = item[:quantity]
    product = Product.find_by(code: item[:code])
    promotion = Promotion.find_by(code: product.promotion_code) if product.promotion_code
    if promotion&.code == "BOGO"
      paid_quantity = (quantity / 2.0).ceil
      product.price * paid_quantity
    elsif promotion&.code&.start_with?("DIS") && quantity >= promotion.threshold
      adjusted_price = product.price * (1 - promotion.discount)
      (adjusted_price * quantity).round(2)
    else
      product.price * quantity
    end
  end
end
