export const PRESELECT_CHARACTER_ONE = "preselectCharacterOne";

export default function preselectCharacterOne(categoryIndex, characterIndex) {
  return {
    type: PRESELECT_CHARACTER_ONE,
    categoryIndex,
    characterIndex
  };
}
