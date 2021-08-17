import uploadFile from "../../common/upload-file";

const updateMapFloorKml = async (floorId, kmlFilename, kmlFile) => {
  let response = await uploadFile(
    `/api/map/floors/${floorId}/kml`,
    'kml',
    kmlFile,
    kmlFilename,
    'PUT');
};

export default updateMapFloorKml;