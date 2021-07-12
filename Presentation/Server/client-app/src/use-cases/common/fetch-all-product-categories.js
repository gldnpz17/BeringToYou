import delay from "../../helpers/delay"

const fetchAllProductCategories = async () => {
  await delay(100);

  return ([
    {
      id: 'Pr0duCT-C4t3G0RY-1D-1',
      name: 'Buah dan Sayur',
      thumbnailFilename: 'thumb1.png'
    },
    {
      id: 'Pr0duCT-C4t3G0RY-1D-2',
      name: 'Bumbu Masak',
      thumbnailFilename: 'thumb2.png'
    }
  ]);
};

export default fetchAllProductCategories;