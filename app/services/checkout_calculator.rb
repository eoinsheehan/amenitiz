class CheckoutCalculator
  attr_reader :items, :cart

  def initialize(cart:)
    @cart = cart
    @items = cart[:items]
  end

  def call
    {items:, total_cost:}
  end

  private

  def total_cost
    total = cart[:total_cost]
    items.each do |item|
      item[:cost] = item_cost(item:)
      if total
        total += item[:cost]
      else
        total = item[:cost]
      end
    end
    total
  end

  def item_cost(item:)
    quantity = item[:quantity]
    product = Product.find_by(code: item[:code])
    promotion = product.promotion
    if promotion&.code == "BOGO"
      buy_one_get_one_free_cost(product:, quantity:)
    elsif promotion&.code&.start_with?("DIS") && quantity >= promotion.threshold
      percentage_discount_cost(product:, quantity:, promotion:)
    else
      product.price * quantity
    end
  end

  def buy_one_get_one_free_cost(product:, quantity:)
    paid_quantity = (quantity / 2.0).ceil
    product.price * paid_quantity
  end

  def percentage_discount_cost(product:, quantity:, promotion:)
    adjusted_price = product.price * (1 - promotion.discount)
    (adjusted_price * quantity).round(2)
  end
end
