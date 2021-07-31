const createShop = async (name, description, floor, latitude, longitude, categoryId, minPrice, maxPrice) => {
  let response = await fetch('/api/shops', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      floor: floor,
      latitude: latitude,
      longitude: longitude,
      categoryId: categoryId,
      minPrice: minPrice,
      maxPrice: maxPrice
    })
  });
};

export default createShop;