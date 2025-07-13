require "rails_helper"
RSpec.feature "Products", js: true do
  context "when user views all products" do
    let(:products) { build_list(:product, 2) }
    it "renders list of all products" do
      visit root_path
      expect(page).to have_content "List of all products"
      expect(page).to have_link "Green Tea"
    end
  end
  context "when user clicks on a product" do
    let(:green_tea_id) { "7qjBRPrP6VptewT480PEhy" }
    it "renders the product content" do
      visit product_path(green_tea_id)
      expect(page).to have_content "Green tea is good for your health."
    end
  end
end
