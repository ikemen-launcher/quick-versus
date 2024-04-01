const platform = require("os").platform();
const util = require("node:util");
const { spawn } = require("node:child_process");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const configYaml = require("config-yaml");
const isDev = process.env.DEV;
const version = process.env.npm_package_version;

// Enable auto-reload in development if set
try {
  if (isDev && process.env.AUTO_RELOAD) require('electron-reloader')(module);
} catch {}

function getCurrentDirectory() {
  let currentDirectory;
  if (process.argv.length >= 3) {
    // TODO use a named option
    currentDirectory = path.normalize(process.argv[2]);
  } else if (isDev) {
    currentDirectory = path.resolve(app.getAppPath(), "dev-env");
  } else if (process.env.PORTABLE_EXECUTABLE_DIR) {
    currentDirectory = process.env.PORTABLE_EXECUTABLE_DIR;
  } else if (process.env.INIT_CWD) {
    currentDirectory = process.env.INIT_CWD;
  } else if (app.getPath("exe")) {
    currentDirectory = path.dirname(app.getPath("exe"));
  } else if (process.execPath) {
    currentDirectory = process.execPath;
  }
  if (path.basename(currentDirectory) === "MacOS") {
    currentDirectory = path.resolve(currentDirectory, "..", "..", "..");
  }

  return currentDirectory;
}

function getConfiguration() {
  const currentDirectory = getCurrentDirectory();
  const jsonFilePath = path.resolve(currentDirectory, "config.json");
  const yamlFilePath = path.resolve(currentDirectory, "config.yml");
  let config;
  if (fs.existsSync(jsonFilePath)) {
    config = require(jsonFilePath);
  } else if (fs.existsSync(yamlFilePath)) {
    config = configYaml(yamlFilePath);
  }

  return config;
}

function createWindow() {
  let width = 1024;
  let height = 576;
  let fullscreen = false;
  let frame = false;

  try {
    const config = getConfiguration();

    if (config) {
      if (config.hasOwnProperty("width")) {
        width = config.width;
      }

      if (config.hasOwnProperty("height")) {
        height = config.height;
      }

      if (config.hasOwnProperty("fullscreen")) {
        fullscreen = config.fullscreen;
      }

      if (config.hasOwnProperty("frame")) {
        frame = config.frame;
      }
    }
  } catch (error) {
    // No override
  }

  const window = new BrowserWindow({
    title: "Quick Versus Launcher",
    backgroundColor: "#333333",
    frame,
    width,
    height,
    fullscreen,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true
    },
    webSecurity: false
  });
  window.loadFile("build/index.html");
  // window.webContents.openDevTools();

  return window;
}

app.on("window-all-closed", () => {
  app.quit();
});

function getVersion(event) {
  event.returnValue = version;
}

async function launchGame(event, options) {
  const directoryPath = getCurrentDirectory();
  const config = getConfiguration();

  let ikemenExecutablePath = `${directoryPath}/.engine/run-ikemen.sh`;
  if (/^win/.test(platform) && config.ikemenExecutableWindows) {
    ikemenExecutablePath = config.ikemenExecutableWindows;
  } else if (config.ikemenExecutable) {
    ikemenExecutablePath = config.ikemenExecutable;
  }

  const args = [];
  if (config.rounds) {
    args.push(`-rounds=${config.rounds}`);
  }
  if (config.motif) {
    args.push(`-motif=${config.motif}`);
  }
  if (config.lifebar) {
    args.push(`-lifebar=${config.lifebar}`);
  }
  if (options.characterOne) {
    args.push(`-p1=${options.characterOne}`);
  }
  if (options.characterOneColorIndex) {
    args.push(`-p1.color=${options.characterOneColorIndex}`);
  }
  if (options.characterTwo) {
    args.push(`-p2=${options.characterTwo}`);
  }
  if (options.characterTwoColorIndex) {
    args.push(`-p2.color=${options.characterTwoColorIndex}`);
  }
  if (options.characterTwoAILevel) {
    args.push(`-p2.ai=${options.characterTwoAILevel}`);
  }
  if (options.stage) {
    args.push(`-s=${options.stage}`);
  }

  return new Promise((resolve, reject) => {
    console.log("launch game", ikemenExecutablePath, args);
    const process = spawn(ikemenExecutablePath, args, { cwd: directoryPath });
    process.stdout.on("data", (data) => {
      console.log(data.toString('utf8'));
    });
    process.stderr.on("data", (data) => {
      console.error(data.toString('utf8'));
    });
    process.on("close", (code) => {
      console.log("end game");
      resolve(true);
    });
  });
}

function getConfigYaml(event, filePath) {
  event.returnValue = configYaml(filePath);
}

function existsSync(event, filePath) {
  event.returnValue = fs.existsSync(filePath);
}

function readFileSync(event, filePath) {
  event.returnValue = fs.readFileSync(filePath, "utf-8");
}

function resolve(event, args) {
  event.returnValue = path.resolve.apply(this, args);
}

function dirname(event, filePath) {
  event.returnValue = path.dirname(filePath);
}

function getCurrentDirectoryExported(event) {
  event.returnValue = getCurrentDirectory();
}

async function start() {
  await app.whenReady();
  ipcMain.on("getVersion", getVersion);
  ipcMain.handle("launchGame", launchGame);
  ipcMain.on("existsSync", existsSync);
  ipcMain.on("readFileSync", readFileSync);
  ipcMain.on("resolve", resolve);
  ipcMain.on("dirname", dirname);
  ipcMain.on("configYaml", getConfigYaml);
  ipcMain.on("getCurrentDirectory", getCurrentDirectoryExported);
  const window = createWindow();
  ipcMain.handle("minimize", () => window.minimize());
  ipcMain.handle("restore", () => window.restore());
  ipcMain.handle("quit", () => window.close());
}
start();
