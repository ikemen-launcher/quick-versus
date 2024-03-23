export default class InvalidYamlError extends Error {
  constructor(filePath) {
    super(`Invalid YAML: ${filePath}`);

    this.filePath = filePath;
  }

  getFilePath() {
    return this.filePath;
  }
}
