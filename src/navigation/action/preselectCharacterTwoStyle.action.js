export const PRESELECT_CHARACTER_TWO_STYLE = "preselectCharacterTwoStyle";

export default function preselectCharacterTwoStyle(styleIndex) {
  return {
    type: PRESELECT_CHARACTER_TWO_STYLE,
    styleIndex
  };
}
