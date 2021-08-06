const updateProfile = async (accountId, username, displayName, email) => {
  let response = await fetch(`/api/accounts/${accountId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      displayName: displayName
    })
  });

  return response;
};

export default updateProfile;