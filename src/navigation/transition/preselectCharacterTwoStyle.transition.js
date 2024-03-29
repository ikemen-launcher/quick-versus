import SELECTING_STYLE from "../sideState/selectingStyle.state";

export default function preselectCharacterTwoStyle(data, action) {
  if (data.rightSideState !== SELECTING_STYLE) {
    throw new Error(`Unable to preselect character two style in state: ${data.state}`);
  }

  const newData = { ...data };
  newData.characterTwoStylePreselectionByCategoryAndCharacterIndex = new Map(data.characterTwoStylePreselectionByCategoryAndCharacterIndex);

  const key = `${newData.characterTwoCategoryIndex}-${newData.characterTwoIndex}`;
  newData.characterTwoStylePreselectionByCategoryAndCharacterIndex.set(key, action.styleIndex);

  return newData;
}
