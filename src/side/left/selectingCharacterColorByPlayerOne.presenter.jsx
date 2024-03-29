import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import { A, B, X } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterAuthor from "../../character/useCharacterAuthor.hook";
import useCharacterColorCount from "../../character/useCharacterColorCount.hook";
import useCharacterColorIndex from "../../character/useCharacterColorIndex.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useSelectColorSound from "../../configuration/useSelectColorSound.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useNavigation from "../../navigation/useData.hook";
import preselectCharacterOneColor from "../../navigation/action/preselectCharacterOneColor.action";
import selectCharacterOneColor from "../../navigation/action/selectCharacterOneColor.action";
import unselectCharacterOne from "../../navigation/action/unselectCharacterOne.action";
import switchMode from "../../navigation/action/switchMode.action";
import Zone from "./zone.view";
import ColorSelector from "../../character/colorSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import CharacterAuthor from "./characterAuthor.view";
import Type from "./type.view";

export default function SelectingCharacterColorByPlayerOne({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const characterName = useCharacterName(character);
  const characterAuthor = useCharacterAuthor(character);
  const colorSound = useSelectColorSound();
  const cancelSound = useCancelSound();
  const colorCount = useCharacterColorCount(character);

  let defaultColorIndex = 1;
  if (navigation.characterOneColorPreselectionByCharacter && navigation.characterOneColorPreselectionByCharacter.has(character)) {
    defaultColorIndex = navigation.characterOneColorPreselectionByCharacter.get(character);
  }
  const onChange = (newColorIndex) => {
    dispatch(preselectCharacterOneColor(newColorIndex));
  };
  const characterColorIndex = useCharacterColorIndex(input, colorCount, onChange, defaultColorIndex);

  useEffect(() => {
    const onConfirm = () => {
      dispatch(selectCharacterOneColor(characterColorIndex));
      colorSound.play();
    };
    const onCancel = () => {
      dispatch(unselectCharacterOne());
      cancelSound.play();
    };
    const onSwitchMode = () => {
      dispatch(switchMode());
    };

    input.addEventListener(A, onConfirm);
    input.addEventListener(B, onCancel);
    input.addEventListener(X, onSwitchMode);

    return () => {
      input.removeEventListener(A, onConfirm);
      input.removeEventListener(B, onCancel);
      input.removeEventListener(X, onSwitchMode);
    };
  }, [input, characterColorIndex, cancelSound, colorSound, dispatch]);

  if (colorCount <= 1) {
    dispatch(selectCharacterOneColor(1));
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
      <Type>Player 1</Type>
    </>
  );
}
