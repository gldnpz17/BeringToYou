import delay from "../../helpers/delay";

const fetchAllMapOverlays = async () => {
  await delay(100);

  return ([
    {
      id: 'S0Me-0V3rLay1D',
      name: 'Overlay 1',
      floorNumber: 1,
      zIndex: 1,
      iconFilename: 'icon1.svg'
    },
    {
      id: 'S0MeM0r3-0V3rLay1D',
      name: 'Overlay 2',
      floorNumber: 1,
      zIndex: 2,
      iconFilename: 'icon2.svg'
    },
    {
      id: 'S0Me0Th3R-0V3rLay1D',
      name: 'Overlay 3',
      floorNumber: 2,
      zIndex: 1,
      iconFilename: 'icon3.svg'
    }
  ]);
};

export default fetchAllMapOverlays;