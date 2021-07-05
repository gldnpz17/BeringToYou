import delay from "../../../helpers/delay";

const fetchAdminAccountPermissions = async (accountId) => {
  await delay(100);

  switch (accountId) {
    case ('S0me-DuMMy-IdeNt1fier'):
      return ({
        name: 'super admin',
        canManageAccounts: true,
        canManagePermissions: true,
        canManageMap: true,
        canManageShops: true,
        canBackupData: true
      });
    case ('S0me0Th3r-DuMMy-IdeNt1fier'):
      return ({
        name: 'moderator',
        canManageAccounts: true,
        canManagePermissions: false,
        canManageMap: false,
        canManageShops: true,
        canBackupData: false
      });
    case ('S0meM0R3-DuMMy-IdeNt1fier'):
      return ({
        name: 'moderator',
        canManageAccounts: true,
        canManagePermissions: false,
        canManageMap: false,
        canManageShops: true,
        canBackupData: false
      });
    default:
      return null;
  };
};

export default fetchAdminAccountPermissions;