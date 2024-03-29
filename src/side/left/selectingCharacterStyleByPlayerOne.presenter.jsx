import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import { A, B, X } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterAuthor from "../../character/useCharacterAuthor.hook";
import useCharacterStyleNames from "../../character/useCharacterStyleNames.hook";
import useCharacterStyleIndex from "../../character/useCharacterStyleIndex.hook";
import useCharacterStyle from "../../character/useCharacterStyle.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useSelectStyleSound from "../../configuration/useSelectStyleSound.hook";
import useNavigation from "../../navigation/useData.hook";
import preselectCharacterOneStyle from "../../navigation/action/preselectCharacterOneStyle.action";
import selectCharacterOneStyle from "../../navigation/action/selectCharacterOneStyle.action";
import unselectCharacterOne from "../../navigation/action/unselectCharacterOne.action";
import switchMode from "../../navigation/action/switchMode.action";
import Zone from "./zone.view";
import StyleSelector from "../../character/styleSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import CharacterAuthor from "./characterAuthor.view";
import Type from "./type.view";

export default function SelectingCharacterStyleByPlayerOne({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const styleSound = useSelectStyleSound();
  const cancelSound = useCancelSound();
  const styleNames = useCharacterStyleNames(character);

  let defaultStyleIndex = 0;
  const key = `${navigation.characterOneCategoryIndex}-${navigation.characterOneIndex}`;
  if (navigation.characterOneStylePreselectionByCategoryAndCharacterIndex && navigation.characterOneStylePreselectionByCategoryAndCharacterIndex.has(key)) {
    defaultStyleIndex = navigation.characterOneStylePreselectionByCategoryAndCharacterIndex.get(key);
  }
  const onChange = (newStyleIndex) => {
    dispatch(preselectCharacterOneStyle(newStyleIndex));
  };
  const characterStyleIndex = useCharacterStyleIndex(input, styleNames.length, onChange, defaultStyleIndex);
  const characterStyle = useCharacterStyle(character, characterStyleIndex);
  const characterName = useCharacterName(characterStyle);
  const characterAuthor = useCharacterAuthor(characterStyle);

  useEffect(() => {
    const onConfirm = () => {
      dispatch(selectCharacterOneStyle(characterStyleIndex, characterStyle));
      styleSound.play();
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
  }, [input, characterStyleIndex, cancelSound, characterStyle, dispatch, styleSound]);

  if (styleNames.length <= 1) {
    dispatch(selectCharacterOneStyle(0, character));
    return null;
  }

  return (
    <>
      <Portrait character={characterStyle} />
      <Zone>
        <StyleSelector names={styleNames} index={characterStyleIndex} />
      </Zone>
      <StandAnimation character={characterStyle} />
      <CharacterName>{characterName}</CharacterName>
      <CharacterAuthor>{characterAuthor}</CharacterAuthor>
      <Type>Player 1</Type>
    </>
  );
}
