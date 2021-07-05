import delay from "../../../helpers/delay";

const fetchAllPermissionPresets = async () => {
  await delay(100);
  
  return ([
    {
      name: 'super admin',
      canManageAccounts: true,
      canManagePermissions: true,
      canManageMap: true,
      canManageShops: true,
      canBackupData: true
    },
    {
      name: 'moderator',
      canManageAccounts: true,
      canManagePermissions: false,
      canManageMap: false,
      canManageShops: true,
      canBackupData: false
    },
    {
      name: 'kosong',
      canManageAccounts: false,
      canManagePermissions: false,
      canManageMap: false,
      canManageShops: false,
      canBackupData: false
    }
  ]);
};

export default fetchAllPermissionPresets;