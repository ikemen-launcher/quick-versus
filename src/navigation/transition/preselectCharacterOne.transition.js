import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";

export default function preselectCharacterOne(data, action) {
  if (data.leftSideState !== SELECTING_CHARACTER) {
    throw new Error(`Unable to select character one in state: ${data.state}`);
  }

  const newData = { ...data };
  newData.characterOnePreselectionByCategory = new Map(data.characterOnePreselectionByCategory);

  newData.characterOnePreselectionByCategory.set(action.categoryIndex, action.characterIndex);

  return newData;
}
