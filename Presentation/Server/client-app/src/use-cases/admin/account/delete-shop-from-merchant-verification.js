const deleteShopFromMerchantVerification = async (accountId, shopId) => {
  let response = await fetch(`/api/merchant/verification-requests/${accountId}/shops/${shopId}`, {
    method: 'DELETE'
  });
};

export default deleteShopFromMerchantVerification;