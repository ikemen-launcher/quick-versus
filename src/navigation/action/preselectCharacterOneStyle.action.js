export const PRESELECT_CHARACTER_ONE_STYLE = "preselectCharacterOneStyle";

export default function preselectCharacterOneStyle(styleIndex) {
  return {
    type: PRESELECT_CHARACTER_ONE_STYLE,
    styleIndex
  };
}
