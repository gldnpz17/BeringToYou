const updatePermissionPreset = async (presetName, permissions) => {
  let response = await fetch(`/api/admin/permission-presets/${presetName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(permissions)
  });
};

export default updatePermissionPreset;