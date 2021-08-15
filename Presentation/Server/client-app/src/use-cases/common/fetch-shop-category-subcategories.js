const fetchShopCategorySubcategories = async (categoryId) => {
  let response = await fetch(`/api/shops/shop-categories/${categoryId}/subcategories`, {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchShopCategorySubcategories;