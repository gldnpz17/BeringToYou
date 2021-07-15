const rejectMerchant = async (accountId) => {
  let response = await fetch(`/api/merchant/verification-requests/${accountId}/reject`, {
    method: 'POST'
  });
};

export default rejectMerchant;