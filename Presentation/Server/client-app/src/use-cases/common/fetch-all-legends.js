const fetchAllLegends = async () => {
  let response = await fetch('/api/map/legends', {
    method: 'GET'
  });

  return (await response.json());
}

export default fetchAllLegends;