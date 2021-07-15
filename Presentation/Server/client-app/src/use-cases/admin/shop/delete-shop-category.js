const deleteShopCategory = async (categoryId) => {
  let response = await fetch(`/api/shops/shop-categories/${categoryId}`, {
    method: 'DELETE'
  });
} ;

export default deleteShopCategory;