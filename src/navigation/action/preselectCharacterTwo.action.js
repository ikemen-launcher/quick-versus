export const PRESELECT_CHARACTER_TWO = "preselectCharacterTwo";

export default function preselectCharacterTwo(categoryIndex, characterIndex) {
  return {
    type: PRESELECT_CHARACTER_TWO,
    categoryIndex,
    characterIndex
  };
}
