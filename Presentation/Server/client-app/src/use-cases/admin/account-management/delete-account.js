const deleteAccount = async (accountId) => {
  let response = await fetch(`/api/accounts/${accountId}`, {
    method: 'DELETE'
  });
};

export default deleteAccount;