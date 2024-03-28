export const PRESELECT_CHARACTER_ONE_COLOR = "preselectCharacterOneColor";

export default function preselectCharacterOneColor(colorIndex) {
  return {
    type: PRESELECT_CHARACTER_ONE_COLOR,
    colorIndex
  };
}
