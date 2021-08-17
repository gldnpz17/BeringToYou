import { useEffect, useState } from "react";
import styled from "styled-components";
import delay from '../helpers/delay';
import SearchTextBox from "./search-textbox";

const StyledAnimatedSearchTextBox = styled(SearchTextBox)`
  input:focus {
    border-color: ${props => props.theme.secondary};
    box-shadow: 0 0 0.1rem 0.2rem ${props => props.theme.secondaryLightTransparent};
  }
`;

const AnimatedSearchTextBox = (props) => {
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    let cancellationToken = {
      isCancelled: false
    };

    animatePlaceholder(cancellationToken);

    return () => {
      cancellationToken.isCancelled = true;
    }
  }, []);

  const animatePlaceholder = async (cancellationToken) => {
    while(true) {
      for (let item of props.placeholders) {
        // Spell out each letter.
        let currentPlaceholder = '';
        for (let x = 0; x < item.length; x++) {
          currentPlaceholder += item[x];
          setPlaceholder(currentPlaceholder);

          if (cancellationToken.isCancelled === true) {
            return;
          };

          // Wait for a random amount of time.
          await delay(50 + Math.random(60));
        }

        // Wait before deleting.
        await delay(1000);

        // Delete the whole line.
        for (let x = 0; x < item.length; x++) {
          currentPlaceholder = currentPlaceholder.substring(0, currentPlaceholder.length - 1);
          setPlaceholder(currentPlaceholder);

          if (cancellationToken.isCancelled === true) {
            return;
          };

          // Wait for a random amount of time.
          await delay(50 + Math.random(60));
        };

        // Wait before typing again.
        await delay(1500);
      }
    }
  }

  return (
    <StyledAnimatedSearchTextBox placeholder={placeholder} {...props} />
  );
};

export default AnimatedSearchTextBox;