import ini from "ini";
import getCharacterDefinition from "./getCharacterDefinition";
import getObjectPropertyValueCaseInsensitive from "../../util/getObjectPropertyValueCaseInsensitive";

export default function getCharacterAuthor(character, currentDirectory) {
  if (!character) {
    return "Unknown";
  }

  if (character.random) {
    return "Unknown";
  }

  const definition = getCharacterDefinition(character, currentDirectory);
  if (!definition) {
    return "Unknown";
  }

  const info = getObjectPropertyValueCaseInsensitive(definition, "info");
  if (!info) {
    return "Unknown";
  }

  const author = getObjectPropertyValueCaseInsensitive(info, "author");
  if (author) {
    return ini.unsafe(author);
  }

  return "Unknown";
}
