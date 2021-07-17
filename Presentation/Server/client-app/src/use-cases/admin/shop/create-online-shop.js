const createOnlineShop = async (shopId, platformId, name, url) => {
  let response = await fetch(`/api/shops/${shopId}/online-shops`, {
    method: 'POST',
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

export default createOnlineShop;