const fetchAllShops = async () => {
  let response = await fetch('/api/shops?start=0&count=1000', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllShops;