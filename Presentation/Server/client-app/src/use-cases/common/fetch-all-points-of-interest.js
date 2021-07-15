import delay from "../../helpers/delay";

const fetchAllPointsOfInterest = async () => {
  let response = await fetch('/api/map/points-of-interest', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllPointsOfInterest;