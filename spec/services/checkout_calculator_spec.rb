require "rails_helper"

RSpec.describe CheckoutCalculator do
  let(:cart) { {items: [{code: "GT1", quantity: 2, cost: nil}], total_cost: nil} }
  let!(:product) { create(:product, code: "GT1", price: 55.00) }

  context "when the checkout has items" do
    it "returns the cost for each item" do
      checkout_calculator = described_class.new(cart:)
      expect(checkout_calculator.call[:total_cost]).to eq 110
    end
    context "when them had a previous associated cost" do
      let(:cart) { {items: [{code: "GT1", quantity: 2, cost: 20}], total_cost: 200} }
      it "updates the total cost of the cart" do
        checkout_calculator = described_class.new(cart:)
        expect(checkout_calculator.call[:total_cost]).to eq 110
      end
    end
    context "when there are associated promotions" do
      context "when there is a buy one get one free offer" do
        let!(:promotion) { create(:promotion, code: "BOGO") }
        let!(:product) { create(:product, code: "GT1", price: 55.00, promotion_code: promotion.code) }
        it "returns the correct discount price" do
          checkout_calculator = described_class.new(cart:)
          expect(checkout_calculator.call[:total_cost]).to eq 55
        end
      end
      context "when there is a discount rate offer after threshold" do
        context "when the discount is 10%" do
          let(:cart) { {items: [{code: "SR1", quantity: 3, cost: nil}], total_cost: nil} }
          let!(:promotion) { create(:promotion, code: "DIS10", discount: 0.10, threshold: 3) }
          let!(:product) { create(:product, code: "SR1", price: 5.00, promotion_code: promotion.code) }
          it "returns the correct cost" do
            checkout_calculator = described_class.new(cart:)
            expect(checkout_calculator.call[:total_cost]).to eq 13.50
          end
        end
        context "when the discount is one third" do
          let(:cart) { {items: [{code: "CF1", quantity: 3, cost: nil}], total_cost: nil} }
          let!(:promotion) { create(:promotion, code: "DIS33", discount: 0.3333, threshold: 3) }
          let!(:product) { create(:product, code: "CF1", price: 11.23, promotion_code: promotion.code) }
          it "returns the correct cost" do
            checkout_calculator = described_class.new(cart:)
            expect(checkout_calculator.call[:total_cost]).to eq 22.46
          end
        end
      end
    end
  end
end
