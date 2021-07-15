const fetchShopDetails = async (shopId) => {
  let response = await fetch(`/api/shops/${shopId}`, {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchShopDetails;