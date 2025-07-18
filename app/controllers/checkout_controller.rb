class CheckoutController < ApplicationController
  def create
    result = CheckoutCalculator.new(cart: checkout_params).call
    render json: result, status: :ok
  end

  private

  def checkout_params
    params.require(:checkout).permit(:total_cost, items: [:price, :name, :code, :quantity, :cost])
  end
end
