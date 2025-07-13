class CheckoutController < ApplicationController
def create
  items = checkout_params[:items]
  total = items.sum do |item|
    product = Product.find(item[:product_id])
    product.price * item[:quantity]
  end

  render json: { items:, total: }
end

private

def checkout_params
  params.require(:checkout).permit(items: [:product_id, :quantity])
end

end
