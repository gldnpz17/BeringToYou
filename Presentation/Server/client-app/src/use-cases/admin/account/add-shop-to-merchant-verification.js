const addShopToMerchantVerification = async (accountId, shopId) => {
  let response = await fetch(`/api/merchant/verification-requests/${accountId}/shops`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      shopId: shopId
    })
  });
};

export default addShopToMerchantVerification;