const fetchMerchantVerificationDetails = async (accountId) => {
  let response = await fetch(`/api/merchant/verification-requests/${accountId}`, {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchMerchantVerificationDetails;