class ApplicationError extends Error {
  constructor(message, errorCode) {
    super(message);

    this.errorCode = errorCode;
  };
}

export const ErrorCode = {
  GpsNotSupported: 'GPS_NOT_SUPPORTED'
}

export default ApplicationError;