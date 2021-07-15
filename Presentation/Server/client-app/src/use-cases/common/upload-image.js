import delay from "../../helpers/delay";
import uploadFile from "./upload-file";

const resizeImage = (src, maxDimension) => {
  return new Promise((resolve, reject) => {
    let image = document.createElement('img');

    image.onload = () => {
      let canvasWidth = image.width;
      let canvasHeight = image.height;
  
      if (canvasWidth > canvasHeight) {
        if (canvasWidth > maxDimension) {
          canvasHeight *= maxDimension / canvasWidth;
          canvasWidth = maxDimension;
        }
      } else {
        if (canvasHeight > maxDimension) {
          canvasWidth *= maxDimension / canvasHeight;
          canvasHeight = maxDimension;
        }
      }
  
      let canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  
      canvas.getContext('2d').drawImage(image, 0, 0, canvasWidth, canvasHeight);

      canvas.toBlob((blob) => {
        resolve(blob);
      });
    };

    image.src = src;
  });
};

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.readAsDataURL(file);
  })
};

const uploadImage = async (url, formName, file, httpMethod='POST', maxDimension=512) => {  
  var arrayBuffer = await readFile(file);
  let blob = await resizeImage(arrayBuffer, maxDimension);

  return (await uploadFile(url, formName, blob, file.name, httpMethod));
};

export default uploadImage;