import delay from "../../helpers/delay";

const fetchAllShopCategories = async () => {
  await delay(100);

  return ([
    {
      id: 'Sh0P-Cat3g0ry-1',
      name: 'Pakaian',
      iconFilename: 'icon1.svg'
    },
    {
      id: 'Sh0P-Cat3g0ry-2',
      name: 'Makanan',
      iconFilename: 'icon2.svg'
    }
  ]);
};

export default fetchAllShopCategories;