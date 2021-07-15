const updateShop = async (shopId, name, description, floor, latitude, longitude, categoryId) => {
  let response = await fetch(`/api/shops/${shopId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      floor: floor,
      latitude: latitude,
      longitude: longitude,
      categoryId: categoryId
    })
  });
};

export default updateShop;