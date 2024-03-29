import useEnvironment from "../configuration/useEnvironment.hook";
import getCharacterAuthor from "./util/getCharacterAuthor";

export default function useCharacterAuthor(character) {
  const environment = useEnvironment();
  return getCharacterAuthor(character, environment.currentDirectory);
}
