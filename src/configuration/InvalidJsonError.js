export default class InvalidJsonError extends Error {
  constructor(filePath) {
    super(`Invalid JSON: ${filePath}`);

    this.filePath = filePath;
  }

  getFilePath() {
    return this.filePath;
  }
}
