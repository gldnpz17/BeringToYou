const updateShopSubcategory = async (subcategoryId, name, color) => {
  let response = await fetch(`/api/shops/shop-categories/subcategories/${subcategoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      rgbHexLegendColor: color
    })
  });

  return response;
};

export default updateShopSubcategory;