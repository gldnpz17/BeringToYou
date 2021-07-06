import delay from "../../helpers/delay";

const fetchAllPointsOfInterest = async () => {
  await delay(100);
  
  return ([
    {
      id: 'S0Me-P0i-1d3ntif13r',
      category: {
        id: 'S0m3-p01C4t-1d3nt1fi3r',
        name: 'Toilet',
        iconFilename: 'icon 1'
      },
      floorNumber: 1,
      latitude: 4.2,
      longitude: 9.6
    },
    {
      id: 'S0MeM0r3-P0i-1d3ntif13r',
      category: {
        id: 'S0m3-p01C4t-1d3nt1fi3r',
        name: 'Toilet',
        iconFilename: 'icon 1'
      },
      floorNumber: 2,
      latitude: 9.6,
      longitude: 4.2
    },
    {
      id: 'S0Me0th3R-P0i-1d3ntif13r',
      category: {
        id: 'S0m3m0r3-p01C4t-1d3nt1fi3r',
        name: 'Mushola',
        iconFilename: 'icon 2'
      },
      floorNumber: 2,
      latitude: 1.1,
      longitude: 9.1
    }
  ]);
};

export default fetchAllPointsOfInterest;