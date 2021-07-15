const fetchMerchantVerificationShops = async (accountId) => {
  let response = await fetch(`/api/merchant/verification-requests/${accountId}/shops`, {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchMerchantVerificationShops;