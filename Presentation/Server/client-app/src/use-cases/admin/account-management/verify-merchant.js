const verifyMerchant = async (accountId) => {
  let response = await fetch(`/api/merchant/verification-requests/${accountId}/accept`, {
    method: 'POST'
  });
};

export default verifyMerchant;