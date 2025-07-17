module Admin
  class ProductsController < ApplicationController
    def index
      @products = Product.all

      respond_to do |format|
        format.html
        format.json { render json: @products }
      end
    end

    def show
      @product = Product.find(params[:id])

      respond_to do |format|
        format.html
        format.json { render json: @product.as_json(include: [:promotion]) }
      end
    end
  end
end
