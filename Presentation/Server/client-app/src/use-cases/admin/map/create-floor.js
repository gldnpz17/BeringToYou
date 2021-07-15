const createFloor = async (floorNumber) => {
  let response = await fetch('/api/map/floors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      floorNumber: floorNumber
    })
  });
};

export default createFloor;