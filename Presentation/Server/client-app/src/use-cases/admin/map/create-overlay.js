const createOverlay = async (floorNumber, zIndex, name) => {
  let response = await fetch('/api/map/overlays', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      floorNumber: floorNumber,
      zIndex: zIndex,
      name: name
    })
  });
};

export default createOverlay;