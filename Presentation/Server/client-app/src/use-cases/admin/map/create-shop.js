const createShop = async (name, description, floor, latitude, longitude, categoryId) => {
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
      categoryId: categoryId
    })
  });
};

export default createShop;