import delay from "../../../helpers/delay";

const fetchAllPermissionPresets = async () => {
  let response = await fetch('/api/admin/permission-presets', {
    method: 'GET'
  });

  return await response.json();
};

export default fetchAllPermissionPresets;