const createPointOfInterestCategory = async (name) => {
  let response = await fetch('/api/map/point-of-interest-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default createPointOfInterestCategory;