const resetPassword = async (accountId, newPassword) => {
  let response = await fetch(`/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accountId: accountId,
      newPassword: newPassword
    })
  });

  return response;
};

export default resetPassword;