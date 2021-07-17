const editOnlineShop = async (shopId, onlineShopId, platformId, name, url) => {
  let response = await fetch(`/api/shops/${shopId}/online-shops/${onlineShopId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      platformId: platformId,
      name: name,
      url: url
    })
  });
};

export default editOnlineShop;