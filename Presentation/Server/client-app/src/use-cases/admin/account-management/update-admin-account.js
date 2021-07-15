const updateAdminAccountPermissions = async (accountId, presetName) => {
  let response = await fetch(`/api/admin/accounts/${accountId}/permissions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      presetName: presetName
    })
  });
};

export default updateAdminAccountPermissions;