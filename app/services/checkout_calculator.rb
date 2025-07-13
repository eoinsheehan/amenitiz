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
    product = Product.find(item[:id])
    case product.promotion_code
    when "BOGO"
      paid_quantity = (item[:quantity] / 2.0).ceil
      product.price * paid_quantity
    else
      product.price * item[:quantity]
    end
  end
end
