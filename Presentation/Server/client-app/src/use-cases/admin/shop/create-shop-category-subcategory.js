const createShopCategorySubcategory = async (categoryId, name) => {
  let response = await fetch(`/api/shops/shop-categories/${categoryId}/subcategories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });

  return response;
}

export default createShopCategorySubcategory;