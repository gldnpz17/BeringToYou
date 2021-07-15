const deleteShop = async (shopId) => {
  let response = await fetch(`/api/shops/${shopId}`, {
    method: 'DELETE'
  });
} ;

export default deleteShop;