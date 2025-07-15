require "rails_helper"

RSpec.describe "Checkout", type: :request do
  describe "POST /checkout" do
    let!(:coffee) { create(:product, code: "CF1", price: 10.0) }
    let!(:green_tea) { create(:product, code: "GT1", price: 15.0) }

    let(:checkout_payload) do
      {
        items: [
          {code: "GT1", quantity: 2},
          {code: "CF1", quantity: 1}
        ],
        total_cost: nil
      }
    end

    context "when there are no promotions" do
      it "returns a JSON response with all checkout contents and total" do
        post "/checkout", params: checkout_payload.to_json,
          headers: {"CONTENT_TYPE" => "application/json"}

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)

        expect(json["items"]).to match_array([
          {"code" => "GT1", "quantity" => 2, "cost" => 30.00},
          {"code" => "CF1", "quantity" => 1, "cost" => 10.00}
        ])

        expect(json["total_cost"]).to eq(40.0)
      end
    end
  end
end
