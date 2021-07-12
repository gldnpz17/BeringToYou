import delay from "../../helpers/delay"

const fetchAllOnlineShopPlatforms = async () => {
  await delay(100);

  return ([
    {
      id: 'T0k0p3d1A',
      name: 'Tokopedia',
      iconFilename: 'icon1.png'
    },
    {
      id: 'Amaz0N',
      name: 'Amazon',
      iconFilename: 'icon1.png'
    }
  ])
};

export default fetchAllOnlineShopPlatforms;