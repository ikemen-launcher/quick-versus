import SELECTING_COLOR from "../sideState/selectingColor.state";

export default function preselectCharacterOneColor(data, action) {
  if (data.leftSideState !== SELECTING_COLOR) {
    throw new Error(`Unable to preselect character one color in state: ${data.state}`);
  }

  const newData = { ...data };
  newData.characterOneColorPreselectionByCharacter = new Map(data.characterOneColorPreselectionByCharacter);

  newData.characterOneColorPreselectionByCharacter.set(newData.characterOne, action.colorIndex);

  return newData;
}
