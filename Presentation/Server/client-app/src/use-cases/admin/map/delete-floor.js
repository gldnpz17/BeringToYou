const deleteFloor = async (floorId) => {
  let response = await fetch(`/api/map/floors/${floorId}`, {
    method: 'DELETE',
  });
};

export default deleteFloor;

