import delay from "../../helpers/delay"

const fetchOnlineShops = async (shopId) => {
  await delay(100);

  return ([
    {
      id: 'S0M3-Onl1ne-Sh0p1D-1',
      platform: {
        id: 'T0k0p3d1A',
        name: 'Tokopedia'
      },
      name: 'Toko Lorem Ipsum',
      url: 'https://www.tokopedia.com/ntahlah'
    },
    {
      id: 'S0M3-Onl1ne-Sh0p1D-2',
      platform: {
        id: 'Amaz0N',
        name: 'Amazon'
      },
      name: 'Bukan Toko Lorem Ipsum',
      url: 'https://www.amazon.co.jp/will-lead-to-404-page'
    }
  ])
};

export default fetchOnlineShops;