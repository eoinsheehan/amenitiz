require 'rails_helper'

RSpec.describe "Checkout", type: :request do
  describe "POST /checkout" do
    let(:product1) { instance_double(Product, id: 1, price: 10.0) }
    let(:product2) { instance_double(Product, id: 2, price: 15.0) }

    before do
      allow(Product).to receive(:find).with(1).and_return(product1)
      allow(Product).to receive(:find).with(2).and_return(product2)
    end

    let(:checkout_payload) do
      {
        checkout: {
          items: [
            { product_id: 1, quantity: 2 },
            { product_id: 2, quantity: 1 }
          ]
        }
      }
    end

    it "returns a JSON response with all checkout contents and total" do
      post "/checkout", params: checkout_payload.to_json,
                         headers: { "CONTENT_TYPE" => "application/json" }

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json["items"]).to match_array([
        { "product_id" => 1, "quantity" => 2 },
        { "product_id" => 2, "quantity" => 1 }
      ])

      expect(json["total"]).to eq(35.0)
    end
  end
end
