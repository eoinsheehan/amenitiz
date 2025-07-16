require "rails_helper"

RSpec.describe "Products", type: :request do
  let!(:green_tea) { create(:product, id: 1, name: "green tea") }
  let!(:coffee) { create(:product, id: 2, name: "coffee") }

  describe "GET /admin/products (HTML)" do
    it "renders the HTML view" do
      get "/admin/products"
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include("text/html")
      expect(response.body).to include("green tea")
    end
  end

  describe "GET /admin/products.json (JSON)" do
    it "returns JSON data with all products" do
      get "/admin/products.json"
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include("application/json")

      data = JSON.parse(response.body)
      expect(data.size).to eq(2)
      expect(data.map { |p| p["name"] }).to include("green tea", "coffee")
    end
  end

  describe "GET /admin/product/:id (HTML)" do
    it "renders the HTML view" do
      get "/admin/products/1"
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include("text/html")
      expect(response.body).to include("green tea")
    end
  end

  describe "GET /admin/products.json (JSON)" do
    it "returns JSON data for the relevant product" do
      get "/admin/products/#{green_tea.id}.json"
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include("application/json")

      data = JSON.parse(response.body)
      expect(data["name"]).to eq("green tea")
    end
  end
end
