const fetchAllMerchantVerificationRequests = async () => {
  let reponse = await fetch('/api/merchant/verification-requests', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllMerchantVerificationRequests;