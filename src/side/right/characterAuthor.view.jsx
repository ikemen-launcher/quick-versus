import React from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
  position: absolute;
  z-index: 129;
  white-space: nowrap;
  right: ${props => props.x};
  bottom: 0vh;
  font-family: Roboto;
  font-size: 1.5vw;
  letter-spacing: 0.05em;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px #000, 2px -2px 4px #000, -2px 2px 4px #000, -2px -2px 4px #000;
  transform: translateX(100%);
`;

export default function CharacterAuthor({ children }) {
  const x = "43vw";
  return <Wrapper x={x}>by {children}</Wrapper>;
}
