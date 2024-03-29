import React from "react";
import styled from "styled-components";
import useCharacterNameOptions from "../../configuration/useCharacterNameOptions.hook";

const Wrapper = styled.h1`
  position: absolute;
  z-index: 130;
  white-space: nowrap;
  right: ${props => props.x};
  bottom: 3vh;
  font-family: HeyComic;
  font-size: 4vw;
  letter-spacing: 0.05em;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px #000, 2px -2px 4px #000, -2px 2px 4px #000, -2px -2px 4px #000;
  transform: translateX(100%);
`;

export default function CharacterName({ children }) {
  const options = useCharacterNameOptions();

  let x = "43vw";
  if (options && options.x) {
    x = options.x;
  }

  return <Wrapper x={x}>{children}</Wrapper>;
}
