import delay from "../../helpers/delay";

const fetchAllPointOfInterestCategories = async () => {
  let response = await fetch('/api/map/point-of-interest-categories', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllPointOfInterestCategories;