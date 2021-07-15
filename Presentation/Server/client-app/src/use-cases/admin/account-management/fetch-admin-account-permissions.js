import delay from "../../../helpers/delay";

const fetchAdminAccountPermissions = async (accountId) => {
  await delay(100);

  let response = await fetch(`/api/admin/accounts/${accountId}/permissions`, {
    method: 'GET'
  });

  return await response.json();
};

export default fetchAdminAccountPermissions;