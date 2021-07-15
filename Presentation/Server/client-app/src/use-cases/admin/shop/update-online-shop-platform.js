const updateOnlineShopPlatform = async (platformId, name) => {
  let response = await fetch(`/api/online-shop-platforms/${platformId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default updateOnlineShopPlatform;