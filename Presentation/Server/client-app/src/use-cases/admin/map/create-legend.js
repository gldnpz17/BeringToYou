const createLegend = async (label) => {
  let response = await fetch('/api/map/legends', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      label: label
    })
  });

  return response;
}

export default createLegend;