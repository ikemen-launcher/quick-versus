import SELECTING_COLOR from "../sideState/selectingColor.state";

export default function preselectCharacterTwoColor(data, action) {
  if (data.rightSideState !== SELECTING_COLOR) {
    throw new Error(`Unable to preselect character two color in state: ${data.state}`);
  }

  const newData = { ...data };
  newData.characterTwoColorPreselectionByCharacter = new Map(data.characterTwoColorPreselectionByCharacter);

  newData.characterTwoColorPreselectionByCharacter.set(newData.characterTwo, action.colorIndex);

  return newData;
}
