import delay from "../helpers/delay";

const checkAuthStatus = async () => {
  await delay(100);

  return true;
};

export default checkAuthStatus;