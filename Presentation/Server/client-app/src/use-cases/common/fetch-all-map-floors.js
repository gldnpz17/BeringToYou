import delay from "../../helpers/delay";

const fetchAllMapFloors = async () => {
  let response = await fetch('/api/map/floors', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllMapFloors;