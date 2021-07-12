import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "./custom-button";
import IconButton from "./icon-button";
import UploadIcon from '../svg/upload-icon';
import AddIcon from '../svg/add-icon';

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
`;

const AddImageButton = styled(IconButton)`
  margin-bottom: 0.2rem;

  height: 4rem;
  width: 6rem;
`;

const ImageListControl = ({initialImages, images, setImages, ...props}) => {
  const fileInput = useRef();

  useEffect(() => {
    if (initialImages) {
      setImages(initialImages?.map(url => {
        return ({
          isNew: false,
          source: url
        });
      }));
    } else {
      setImages([]);
    }
  }, []);

  let imageList = React.createRef();

  const addImage = (file) => {
    const newImages = [...images];

    newImages.push({
      isNew: true,
      source: file
    });
    
    setImages(newImages);
  };

  const deleteImage = (index) => {
    const newImages = [...images];

    newImages.splice(index, 1);

    setImages(newImages);
  };

  const swapImages = (index1, index2) => {
    const newImages = [...images];

    newImages[index1] = images[index2];
    newImages[index2] = images[index1];

    setImages(newImages);
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
    
    swapImages(dragIndex, dropIndex);
  };

  const cancelDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  return (
    <div>
      <ImageList ref={imageList} className='d-flex flex-row flex-wrap'>
        {images?.map((image, index) => {
          return (
            <ImageItem draggable={true}
              onDragStart={handleDrag}
              onDrop={handleDrop}
              onDoubleClick={() => deleteImage(index)}
              onDragOver={cancelDefault}
              onDragEnter={cancelDefault}
            >
              <img src={(image.isNew ? URL.createObjectURL(image?.source) : image?.source)}
              />
            </ImageItem>
          );
        })}
        <AddImageButton iconOnly onClick={() => fileInput.current.click()}>
          <AddIcon />
        </AddImageButton>
      </ImageList>
      <input ref={fileInput} style={{display: 'none'}} type='file' accept='image/*' onChange={(event) => addImage(event.target.files[0])} />
    </div>
  );
};

export default ImageListControl;