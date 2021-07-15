const createShopCategory = async (name) => {
  let response = await fetch('/api/shops/shop-categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  });
};

export default createShopCategory;