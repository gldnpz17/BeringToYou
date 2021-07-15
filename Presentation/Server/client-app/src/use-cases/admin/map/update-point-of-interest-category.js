const updatePointOfInterestCategory = async (categoryId, name) => {
  let response = await fetch(`/api/map/point-of-interest-categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default updatePointOfInterestCategory;