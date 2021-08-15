const deleteLegend = async (legendId) => {
  let response = await fetch(`/api/map/legends/${legendId}`, {
    method: 'DELETE'
  });

  return response;
};

export default deleteLegend;