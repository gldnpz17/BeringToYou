import delay from "../../helpers/delay"

const fetchShopProducts = async (shopId) => {
  await delay(100);

  return ([
    {
      id: 'S0m3-Pr0duCt-1',
      name: 'Nama Produk 1',
      minimumPrice: 10000,
      maximumPrice: 20000,
      categoryName: 'Buah dan sayur',
      mainImageThumbnailFilename: 'image1.png'
    },
    {
      id: 'S0m3-Pr0duCt-2',
      name: 'Nama Produk 2',
      minimumPrice: 15000,
      maximumPrice: 25000,
      categoryName: 'Buah dan sayur',
      mainImageThumbnailFilename: 'image2.png'
    },
    {
      id: 'S0m3-Pr0duCt-3',
      name: 'Nama Produk 3',
      minimumPrice: 5000,
      maximumPrice: 8500,
      categoryName: 'Bumbu masak',
      mainImageThumbnailFilename: 'image3.png'
    }
  ]);
}; export default fetchShopProducts;