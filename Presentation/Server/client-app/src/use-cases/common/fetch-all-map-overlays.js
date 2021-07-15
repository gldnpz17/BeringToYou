import delay from "../../helpers/delay";

const fetchAllMapOverlays = async () => {
  let response = await fetch('/api/map/overlays', {
    method: 'GET'
  });

  return (await response.json());
};

export default fetchAllMapOverlays;