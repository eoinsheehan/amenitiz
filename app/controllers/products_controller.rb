class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    puts params
    @product = Product.find(params[:id])
  end
end
