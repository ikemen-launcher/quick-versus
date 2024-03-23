import FileNotFoundError from "./FileNotFoundError";
import InvalidJsonError from "./InvalidJsonError";
import InvalidYamlError from "./InvalidYamlError";

export default function loadConfiguration() {
  const configuration = {};
  const currentDirectory = mainAPI.getCurrentDirectory();

  const jsonFilePath = mainAPI.resolve(currentDirectory, "config.json");
  const yamlFilePath = mainAPI.resolve(currentDirectory, "config.yml");
  if (!mainAPI.existsSync(jsonFilePath) && !mainAPI.existsSync(yamlFilePath)) {
    throw new FileNotFoundError(jsonFilePath);
  }

  if (mainAPI.existsSync(jsonFilePath)) {
    try {
      const jsonContent = mainAPI.readFileSync(jsonFilePath);
      const content = JSON.parse(jsonContent);
      Object.assign(configuration, content);
    } catch (error) {
      throw new InvalidJsonError(jsonFilePath);
    }
  } else if (mainAPI.existsSync(yamlFilePath)) {
    try {
      const content = mainAPI.configYaml(yamlFilePath);
      Object.assign(configuration, content);
    } catch (error) {
      throw new InvalidYamlError(yamlFilePath);
    }
  }

  const keyConfigJsonFilePath = mainAPI.resolve(currentDirectory, "keyConfig.json");
  const keyConfigYamlFilePath = mainAPI.resolve(currentDirectory, "keyConfig.yml");
  if (!mainAPI.existsSync(keyConfigJsonFilePath) && !mainAPI.existsSync(keyConfigYamlFilePath)) {
    throw new FileNotFoundError(keyConfigJsonFilePath);
  }

  if (mainAPI.existsSync(keyConfigJsonFilePath)) {
    try {
      const jsonContent = mainAPI.readFileSync(keyConfigJsonFilePath);
      const content = JSON.parse(jsonContent);
      Object.assign(configuration, content);
    } catch (error) {
      throw new InvalidJsonError(keyConfigJsonFilePath);
    }
  } else if (mainAPI.existsSync(keyConfigYamlFilePath)) {
    try {
      const content = mainAPI.configYaml(keyConfigYamlFilePath);
      Object.assign(configuration, content);
    } catch (error) {
      throw new InvalidYamlError(keyConfigYamlFilePath);
    }
  }

  const charsJsonFilePath = mainAPI.resolve(currentDirectory, "chars.json");
  const charsYamlFilePath = mainAPI.resolve(currentDirectory, "chars.yml");
  if (!mainAPI.existsSync(charsJsonFilePath) && !mainAPI.existsSync(charsYamlFilePath)) {
    throw new FileNotFoundError(charsJsonFilePath);
  }

  if (mainAPI.existsSync(charsJsonFilePath)) {
    try {
      const jsonContent = mainAPI.readFileSync(charsJsonFilePath);
      const content = JSON.parse(jsonContent);
      Object.assign(configuration, content);
    } catch (error) {
      throw new InvalidJsonError(charsJsonFilePath);
    }
  } else if (mainAPI.existsSync(charsYamlFilePath)) {
    try {
      const content = mainAPI.configYaml(charsYamlFilePath);
      Object.assign(configuration, content);
    } catch (error) {
      throw new InvalidYamlError(charsYamlFilePath);
    }
  }

  const stagesJsonFilePath = mainAPI.resolve(currentDirectory, "stages.json");
  const stagesYamlFilePath = mainAPI.resolve(currentDirectory, "stages.yml");
  if (!mainAPI.existsSync(stagesJsonFilePath) && !mainAPI.existsSync(stagesYamlFilePath)) {
    throw new FileNotFoundError(stagesJsonFilePath);
  }

  if (mainAPI.existsSync(stagesJsonFilePath)) {
    try {
      const jsonContent = mainAPI.readFileSync(stagesJsonFilePath);
      const content = JSON.parse(jsonContent);
      configuration.stages = content;
    } catch (error) {
      throw new InvalidJsonError(stagesJsonFilePath);
    }
  } else if (mainAPI.existsSync(stagesYamlFilePath)) {
    try {
      const content = mainAPI.configYaml(stagesYamlFilePath);
      configuration.stages = content;
    } catch (error) {
      throw new InvalidYamlError(stagesYamlFilePath);
    }
  }



  return configuration;
}
