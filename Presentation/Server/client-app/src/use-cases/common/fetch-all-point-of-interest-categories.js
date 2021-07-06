import delay from "../../helpers/delay";

const fetchAllPointOfInterestCategories = async () => {
  await delay(100);
  
  return ([
    {
      id: 'S0m3-p01C4t-1d3nt1fi3r',
      name: 'Toilet',
      iconFilename: 'icon 1'
    },
    {
      id: 'S0m3m0r3-p01C4t-1d3nt1fi3r',
      name: 'Mushola',
      iconFilename: 'icon 2'
    }
  ]);
};

export default fetchAllPointOfInterestCategories;