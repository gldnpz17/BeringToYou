const deleteMerchantVerificationImage = async (accountId, filename) => {
  let reponse = await fetch(`/api/merchant/verification-requests/${accountId}/photos/${filename}`, {
    method: 'DELETE'
  });
};

export default deleteMerchantVerificationImage;