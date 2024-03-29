import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import { A, B } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterAuthor from "../../character/useCharacterAuthor.hook";
import useCharacterColorCount from "../../character/useCharacterColorCount.hook";
import useCharacterColorIndex from "../../character/useCharacterColorIndex.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import useSelectColorSound from "../../configuration/useSelectColorSound.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useNavigation from "../../navigation/useData.hook";
import preselectCharacterTwoColor from "../../navigation/action/preselectCharacterTwoColor.action";
import selectCharacterTwoColor from "../../navigation/action/selectCharacterTwoColor.action";
import ColorSelector from "../../character/colorSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";
import Zone from "./zone.view";

export default function SelectingCharacterColorByPlayerTwo({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const colorSound = useSelectColorSound();
  const cancelSound = useCancelSound();
  const characterName = useCharacterName(character);
  const characterAuthor = useCharacterAuthor(character);
  const colorCount = useCharacterColorCount(character);

  let defaultColorIndex = 1;
  if (navigation.characterTwoColorPreselectionByCharacter && navigation.characterTwoColorPreselectionByCharacter.has(character)) {
    defaultColorIndex = navigation.characterTwoColorPreselectionByCharacter.get(character);
  }
  const onChange = (newColorIndex) => {
    dispatch(preselectCharacterTwoColor(newColorIndex));
  };
  const characterColorIndex = useCharacterColorIndex(input, colorCount, onChange, defaultColorIndex);

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
      cancelSound.play();
    };
    const onConfirm = () => {
      dispatch(selectCharacterTwoColor(characterColorIndex));
      colorSound.play();
    };

    input.addEventListener(A, onConfirm);
    input.addEventListener(B, onCancel);

    return () => {
      input.removeEventListener(A, onConfirm);
      input.removeEventListener(B, onCancel);
    };
  }, [input, characterColorIndex, cancelSound, colorSound, dispatch]);

  if (colorCount <= 1) {
    dispatch(selectCharacterTwoColor(1));
    return null;
  }

  return (
    <>
      <Portrait character={character} />
      <Zone>
        <ColorSelector total={colorCount} index={characterColorIndex} />
      </Zone>
      <StandAnimation character={character} colorIndex={characterColorIndex} />
      <CharacterName>{characterName}</CharacterName>
      <CharacterAuthor>{characterAuthor}</CharacterAuthor>
      <Type>Player 2</Type>
    </>
  );
}
