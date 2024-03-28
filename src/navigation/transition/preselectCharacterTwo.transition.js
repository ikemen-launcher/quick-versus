import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";

export default function preselectCharacterTwo(data, action) {
  if (data.rightSideState !== SELECTING_CHARACTER) {
    throw new Error(`Unable to preselect character two in state: ${data.state}`);
  }

  const newData = { ...data };
  newData.characterTwoPreselectionByCategory = new Map(data.characterTwoPreselectionByCategory);

  newData.characterTwoPreselectionByCategory.set(action.categoryIndex, action.characterIndex);

  return newData;
}
