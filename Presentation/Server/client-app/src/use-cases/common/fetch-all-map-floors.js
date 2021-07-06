import delay from "../../helpers/delay";

const fetchAllMapFloors = async () => {
  delay(100);

  return ([
    {
      floorNumber: 1,
      kmlFilename: 'floor1.kml'
    },
    {
      floorNumber: 2,
      kmlFilename: 'floor2.kml'
    },
    {
      floorNumber: 3,
      kmlFilename: 'floor3.kml'
    }
  ]);
};

export default fetchAllMapFloors;