import React from "react";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterAuthor from "../../character/useCharacterAuthor.hook";
import useColorIndex from "./useColorIndex.hook";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import CharacterAuthor from "./characterAuthor.view";
import Type from "./type.view";

export default function SelectedCharacter({ character }) {
  const characterName = useCharacterName(character);
  const characterAuthor = useCharacterAuthor(character);
  const colorIndex = useColorIndex();

  return (
    <>
      <Portrait character={character} />
      <StandAnimation character={character} colorIndex={colorIndex} />
      <CharacterName>{characterName}</CharacterName>
      <CharacterAuthor>{characterAuthor}</CharacterAuthor>
      <Type>Player 1</Type>
    </>
  );
}
