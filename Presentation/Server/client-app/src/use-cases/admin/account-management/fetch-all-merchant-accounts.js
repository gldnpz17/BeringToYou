import delay from "../../../helpers/delay";

const fetchAllMerchantAccounts = async () => {
  await delay(100);

  return ([
    {
      id: 'S0me-DuMMy-IdeNt1fier',
      email: 'lorem@mail.com',
      displayName: 'Lorem Ipsum',
      profilePictureFilename: 'someprofpic.png',
      verified: true
    },
    {
      id: 'S0me0Th3r-DuMMy-IdeNt1fier',
      email: 'dolor@mail.com',
      displayName: 'Dolor Sit Amet',
      profilePictureFilename: 'someprofpic.png',
      verified: false
    }
  ]);
};

export default fetchAllMerchantAccounts;