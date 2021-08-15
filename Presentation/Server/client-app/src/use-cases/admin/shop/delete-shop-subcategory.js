const deleteShopSubcategory = async (subcategoryId) => {
  let response = await fetch(`/api/shops/shop-categories/subcategories/${subcategoryId}`, {
    method: 'DELETE'
  });

  return response;
};

export default deleteShopSubcategory;