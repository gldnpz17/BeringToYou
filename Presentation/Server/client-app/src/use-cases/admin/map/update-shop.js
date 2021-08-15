const updateShop = async (shopId, name, description, minPrice, maxPrice, floor, latitude, longitude, categoryId, subcategoryIds) => {
  let response = await fetch(`/api/shops/${shopId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      floor: floor,
      minPrice: minPrice,
      maxPrice: maxPrice,
      latitude: latitude,
      longitude: longitude,
      categoryId: categoryId,
      subcategoryIds: subcategoryIds
    })
  });

  return response;
};

export default updateShop;