export const PRESELECT_CHARACTER_TWO_COLOR = "preselectCharacterTwoColor";

export default function preselectCharacterTwoColor(colorIndex) {
  return {
    type: PRESELECT_CHARACTER_TWO_COLOR,
    colorIndex
  };
}
