const deletePointOfInterest = async (pointOfInterestId) => {
  let response = await fetch(`/api/map/points-of-interest/${pointOfInterestId}`, {
    method: 'DELETE'
  });
};

export default deletePointOfInterest;