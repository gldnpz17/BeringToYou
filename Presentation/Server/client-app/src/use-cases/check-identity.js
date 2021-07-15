import delay from "../helpers/delay";

const checkIdentity = async () => {
  await delay(100);

  let response = await fetch('/api/auth/get-identity', {
    method: 'GET'
  });

  if (response.status === 200) {
    let body = await response.json();

    return ({
      isAuthenticated: true,
      ...body
    });
  } else {
    return ({
      isAuthenticated: false
    });
  }
};

export default checkIdentity;