const updateOverlay = async (overlayId, floorNumber, zIndex, name) => {
  let response = await fetch(`/api/map/overlays/${overlayId}`, {
    method: 'PUT',
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

export default updateOverlay;