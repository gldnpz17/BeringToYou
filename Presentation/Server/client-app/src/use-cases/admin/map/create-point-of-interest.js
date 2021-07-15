const createPointOfInterest = async (categoryId, floorNumber, latitude, longitude) => {
  let response = await fetch('/api/map/points-of-interest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      categoryId: categoryId,
      floorNumber: floorNumber,
      latitude: latitude,
      longitude: longitude
    })
  });
};

export default createPointOfInterest