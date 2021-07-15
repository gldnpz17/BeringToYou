const updateFloor = async (floorId, floorNumber) => {
  let response = await fetch(`/api/map/floors/${floorId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      floorNumber: floorNumber
    })
  });
};

export default updateFloor;