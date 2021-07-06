const fetchAllShops = async () => {
  return ([
    {
      id: 'S0m3-Sh0P-1D3nt1f13r',
      name: 'Toko Lorem Ipsum',
      floor: 1,
      latitude: 4.2,
      longitude: 9.6,
      shopCategoryName: 'Pakaian'
    },
    {
      id: 'S0m3M0r3-Sh0P-1D3nt1f13r',
      name: 'Toko Dolor Sit Amet',
      floor: 1,
      latitude: 9.6,
      longitude: 4.2,
      shopCategoryName: 'Pakaian'
    },
    {
      id: 'S0m30th3R-Sh0P-1D3nt1f13r',
      name: 'Toko Consectetur',
      floor: 2,
      latitude: 1.1,
      longitude: 3.9,
      shopCategoryName: 'Makanan'
    }
  ]);
};

export default fetchAllShops;