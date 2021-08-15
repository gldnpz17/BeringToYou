import ApplicationError from '../common/application-error';

export const getGpsCoordinates = () => new Promise((resolve, reject) => {
  let gpsIsAvailable = 'geolocation' in navigator;

  if (!gpsIsAvailable) {
    throw new ApplicationError('GPS is not supported by this device.');
  }

  navigator.geolocation.getCurrentPosition(position => {
    resolve([position.coords.latitude, position.coords.longitude])
  });
});