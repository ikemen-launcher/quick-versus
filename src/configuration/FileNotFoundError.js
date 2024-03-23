export default class FileNotFoundError extends Error {
  constructor(filePath) {
    super(`File not found: ${filePath}`);

    this.filePath = filePath;
  }

  getFilePath() {
    return this.filePath;
  }
}
