import delay from "../../../helpers/delay"

const fetchAllAdminAccounts = async () => {
  await delay(100);

  return ([
    {
      id: 'S0me-DuMMy-IdeNt1fier',
      email: 'lorem@mail.com',
      displayName: 'Lorem Ipsum',
      permissionPresetName: 'superadmin',
      profilePictureFilename: 'someprofpic.png'
    },
    {
      id: 'S0me0Th3r-DuMMy-IdeNt1fier',
      email: 'dolor@mail.com',
      displayName: 'Dolor Sit Amet',
      permissionPresetName: 'moderator',
      profilePictureFilename: 'someprofpic.png'
    },
    {
      id: 'S0meM0R3-DuMMy-IdeNt1fier',
      email: 'consectetur@mail.com',
      displayName: 'Consectetur Adipiscing',
      permissionPresetName: 'moderator',
      profilePictureFilename: 'someprofpic.png'
    }
  ])
};

export default fetchAllAdminAccounts;