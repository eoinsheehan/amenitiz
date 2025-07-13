require "rails_helper"

RSpec.describe CheckoutCalculator do
  let(:cart) { {items: [{id: "GR1", quantity: 2, cost: nil}], total_cost: nil} }
  let(:product) { build(:product, id: "GRI", price: 55.00) }

  before do
    allow(Product).to receive(:find).and_return(product)
  end

  context "when the checkout has items" do
    it "returns the cost for each item" do
      checkout_calculator = described_class.new(cart:)
      expect(checkout_calculator.call[:total_cost]).to eq 110
    end
    context "when them had a previous associated cost" do
      let(:cart) { {items: [{id: "GR1", quantity: 2, cost: 20}], total_cost: nil} }

      it "updates the cost of that item" do
        checkout_calculator = described_class.new(cart:)
        expect(checkout_calculator.call).to eq 110
      end
      it "updates the total cost of the cart" do
        checkout_calculator = described_class.new(cart:)
        expect(checkout_calculator.call[:total_cost]).to eq 100.20
      end
    end
    context "when there are associated promotions" do
        let(:product) { build(:product, id: "GRI", price: 55.00, promotion_code: "BOGO") }
        it "returns the correct discount price" do
                  checkout_calculator = described_class.new(cart:)
      expect(checkout_calculator.call[:total_cost]).to eq 55
        end
    end
  end
end
