const generateRandomName = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const uploadFile = async (url, formName, blob, filename, httpMethod='POST') => {
  let formData = new FormData();
  formData.append(formName, blob, filename);

  let response = await fetch(url, {
    method: httpMethod,
    body: formData
  });

  return ({
    status: response.status
  });
};

export default uploadFile;