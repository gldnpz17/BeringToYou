
const fetchAllOnlineShopPlatforms = async () => {
  let response = await fetch('/api/online-shop-platforms', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllOnlineShopPlatforms;