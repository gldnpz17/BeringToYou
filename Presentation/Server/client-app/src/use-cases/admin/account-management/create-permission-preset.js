const createPermissionPreset = async (presetName) => {
  let response = await fetch(`/api/admin/permission-presets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: presetName
    })
  });
};

export default createPermissionPreset;