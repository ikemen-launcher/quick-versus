import SELECTING_STYLE from "../sideState/selectingStyle.state";

export default function selectCharacterOneStyle(data, action) {
  if (data.leftSideState !== SELECTING_STYLE) {
    throw new Error(`Unable to preselect character one style in state: ${data.state}`);
  }

  const newData = { ...data };
  newData.characterOneStylePreselectionByCategoryAndCharacterIndex = new Map(data.characterOneStylePreselectionByCategoryAndCharacterIndex);

  const key = `${newData.characterOneCategoryIndex}-${newData.characterOneIndex}`;
  newData.characterOneStylePreselectionByCategoryAndCharacterIndex.set(key, action.styleIndex);

  return newData;
}
