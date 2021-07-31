import { useEffect, useState } from "react";
import styled from "styled-components";
import delay from "../helpers/delay";

const Container = styled.div`
  height: 0.6rem;
  transition-duration: 0.3s;

  display: flex;
  justify-content: center;

  &.hidden {
    opacity: 0;
  }

  div {
    transition-duration: 0.25s;

    width: 0.6rem;
    height: 0.6rem;

    border-radius: 0.3rem;

    display: inline-block;

    margin-left: 0.2rem;
    margin-right: 0.2rem;

    background-color: ${props => props.theme.primaryLight};

    &.active {
      background-color: ${props => props.theme.primary};

      transform: scale(1.2);
    }
  }
`;

const LoadingAnimation = ({ loaderCount, isLoading, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const animate = async () => {
    while(true) {
      for (let index = 0; index < loaderCount; index++) {
        setActiveIndex(index);

        await delay(100);
      }
      for (let index = loaderCount; index >= 0; index--) {
        setActiveIndex(index);

        await delay(100);
      }
    }
  } 

  useEffect(() => {
    animate();
  }, []);

  return (
    <Container className={isLoading ? '' : 'hidden'} {...props}>
      {[...Array(loaderCount).keys()].map(index => {
        return (
          <div 
            id={index} 
            className={(index === activeIndex) ? 'active' : ''} 
          />
        );
      })}
    </Container>
  );
};

export default LoadingAnimation;