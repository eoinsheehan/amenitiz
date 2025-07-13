require 'rails_helper'

RSpec.describe 'Products', type: :request do
  let!(:green_tea) { create(:product, id: 1, name: 'green tea') }
  let!(:coffee) { create(:product, id: 2, name: 'coffee') }

  describe 'GET /products (HTML)' do
    it 'renders the HTML view' do
      get '/products'
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('text/html')
      expect(response.body).to include('green tea')
    end
  end

  describe 'GET /products.json (JSON)' do
    it 'returns JSON data with all products' do
      get '/products.json'
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include('application/json')

      data = JSON.parse(response.body)
      expect(data.size).to eq(2)
      expect(data.map { |p| p['name'] }).to include('green tea', 'coffee')
    end
  end
end

