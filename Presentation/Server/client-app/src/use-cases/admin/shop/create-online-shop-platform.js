const createOnlineShopPlatform = async (name) => {
  let response = await fetch('/api/online-shop-platforms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default createOnlineShopPlatform;