require "rails_helper"
RSpec.feature "Products", js: true do
  context "when user views all products" do
    it "renders list of all products" do
      visit "/products"
      expect(page).to have_content "List of all products available"
      expect(page).to have_content "Green tea"
    end
  end
  context "when user clicks on a product" do
    let(:green_tea_id) { "7qjBRPrP6VptewT480PEhy" }
    it "renders the product content" do
      visit "/products/#{green_tea_id}"
      expect(page).to have_content "Green tea is good for your health."
    end
  end
end
