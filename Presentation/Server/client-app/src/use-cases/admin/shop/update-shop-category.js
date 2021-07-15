const updateShopCategory = async (categoryId, name) => {
  let response = await fetch(`/api/product-categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default updateShopCategory;