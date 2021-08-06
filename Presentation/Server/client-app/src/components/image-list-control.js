import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "./custom-button";
import IconButton from "./icon-button";
import UploadIcon from '../svg/upload-icon';
import AddIcon from '../svg/add-icon';
import uploadImage from "../use-cases/common/upload-image";
import { Spinner } from "react-bootstrap";

const ImageList = styled.ul`
  display: flex;
  flex-direction: row;

  padding: 0;

  list-style: none;
`;

const ImageItem = styled.li`
  margin-bottom: 0.2rem;
  margin-right: 0.2rem;
  cursor: move;

  ::marker {
    display: none;
  }

  img {
    object-fit: cover;
    height: 4rem;
    border-radius: 0.3rem;
    border-color: gray;
    border-width: 0.05rem;
    border-style: solid;

    transition-duration: 0.5s;

    height: 4rem;
    width: 6rem;
  }

  &.upload-pending {
    position: relative;

    img {
      filter: brightness(75%);
    }

    &>div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      #image-upload-spinner {
        color: whitesmoke;

        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

const AddImageButton = styled(IconButton)`
  margin-bottom: 0.2rem;

  height: 4rem;
  width: 6rem;
`;

const ImageListControl = ({images, loadImages, onUpload, onSwap, onRemove, ...props}) => {
  const fileInput = useRef();

  const [pendingImages, setPendingImages] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    removeCompletedUploads();
  }, [images])

  const initialize = async () => {
    await loadImages();
  };

  let imageList = React.createRef();

  const pushImage = async (file) => {
    fileInput.current.value = null;

    let newPendingImages = [...pendingImages];

    let newImage = {
      finished: false,
      source: file
    };

    newPendingImages.push(newImage);

    setPendingImages(newPendingImages);

    await onUpload(file);

    newImage.finished = true;

    await loadImages();
  };

  const removeCompletedUploads = () => {
    let newPendingImages = pendingImages.filter(image => !image.finished);

    setPendingImages(newPendingImages);
  }

  const deleteImage = async (filename) => {
    await onRemove(filename);

    await loadImages();
  };

  const swapImages = async (filename1, filename2) => {
    await onSwap(filename1, filename2);

    await loadImages();
  };

  const getElementIndex = (element) => {
    return Array.prototype.indexOf.call(element.parentNode.childNodes, element);
  }

  const handleDrag = (event) => {
    let index = getElementIndex(event.currentTarget);

    if (index >= 0) {
      event.dataTransfer.setData('text/plain', index);
    }
  };

  const handleDrop = (event) => {
    let dragIndex = Number.parseInt(event.dataTransfer.getData('text/plain'));
    let dropIndex = getElementIndex(event.currentTarget);
    
    swapImages(images[dragIndex], images[dropIndex]);
  };

  const cancelDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  return (
    <div>
      <ImageList ref={imageList} className='d-flex flex-row flex-wrap'>
        {images?.map((image) => {
          return (
            <ImageItem draggable={true}
              onDragStart={handleDrag}
              onDrop={handleDrop}
              onDoubleClick={() => deleteImage(image)}
              onDragOver={cancelDefault}
              onDragEnter={cancelDefault}
            >
              <img src={image} />
            </ImageItem>
          );
        })}
        {pendingImages?.map(image => {
          return (
            <ImageItem className='upload-pending'>
              <img src={URL.createObjectURL(image?.source)} />
              <div>
                <Spinner animation="border" id='image-upload-spinner' />
              </div>
            </ImageItem>
          )
        })}
        <AddImageButton iconOnly onClick={() => fileInput.current.click()}>
          <AddIcon />
        </AddImageButton>
      </ImageList>
      <input ref={fileInput} style={{display: 'none'}} type='file' accept='image/*' onChange={(event) => pushImage(event.target.files[0])} />
    </div>
  );
};

export default ImageListControl;