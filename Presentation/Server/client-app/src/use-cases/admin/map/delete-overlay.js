const deleteOverlay = async (overlayId) => {
  let response = await fetch(`/api/map/overlays/${overlayId}`, {
    method: 'DELETE',
  });
};

export default deleteOverlay;