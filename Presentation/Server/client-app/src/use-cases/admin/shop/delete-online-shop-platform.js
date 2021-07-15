const deleteOnlineShopPlatform = async (platformId) => {
  let response = await fetch(`/api/online-shop-platforms/${platformId}`, {
    method: 'DELETE'
  });
};

export default deleteOnlineShopPlatform;