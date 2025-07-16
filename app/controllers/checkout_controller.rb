class CheckoutController < ApplicationController
  def create
    result = CheckoutCalculator.new(cart: checkout_params).call
    render json: result, status: :ok
  end

  private

  def checkout_params
    params.permit(:total_cost, items: [:name, :code, :quantity, :cost])
  end
end
