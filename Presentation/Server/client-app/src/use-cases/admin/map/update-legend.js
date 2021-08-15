const updateLegend = async (legendId, label) => {
  let response = await fetch(`/api/map/legends/${legendId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      label: label
    })
  });

  return response;
}

export default updateLegend;