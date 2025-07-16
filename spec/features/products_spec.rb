require "rails_helper"
RSpec.feature "Products" do
  let!(:green_tea) { create(:product, name: "Green tea", description: "Green tea is good for your health.") }

  context "when user views all products" do
    it "renders list of all products" do
      visit root_path
      expect(page).to have_content "List of all products"
      expect(page).to have_link("Green tea", href: "/products/#{green_tea.id}")
    end
  end
  context "when user clicks on a product" do
    it "renders the product content" do
      visit admin_product_path(green_tea.id)
      expect(page).to have_content green_tea.description
      expect(page).to have_link("Back to products", href: root_path)
    end
  end
end
