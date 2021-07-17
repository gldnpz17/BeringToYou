const deleteOnlineShop = async (shopId, onlineShopId) => {
  let response = await fetch(`/api/shops/${shopId}/online-shops/${onlineShopId}`, {
    method: 'DELETE'
  });
};

export default deleteOnlineShop;