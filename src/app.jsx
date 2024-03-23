import React from "react";
import styled from "styled-components";
import loadConfiguration from "./configuration/loadConfiguration";
import FileNotFoundError from "./configuration/FileNotFoundError";
import InvalidJsonError from "./configuration/InvalidJsonError";
import InvalidYamlError from "./configuration/InvalidYamlError";
import ConfigurationContext from "./configuration/configuration.context";
import EnvironmentContext from "./configuration/environment.context";
import NavigationProvider from "./navigation/navigation.provider";
import StageSelector from "./stage/stageSelector.presenter";
import LeftSide from "./side/leftSide.presenter";
import RightSide from "./side/rightSide.presenter";
import Fight from "./fight/fight.presenter";
import ErrorBoundary from "./error/errorBoundary.view";
import FatalError from "./error/fatalError.view";
import Requirement from "./error/requirement.view";
import versusImagePath from "./assets/versus.png";
import HelpBar from "./help/bar.presenter";

const Wrapper = styled.main`
  flex: 1;
  height: 100%;
  background: #333;
  color: white;
  font-family: HeyComic;
  overflow: hidden;
  background: url(./assets/background.jpg);
  background-size: cover;
  background-position: 50%;
`;
const CustomBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;
const Versus = styled.img`
  position: absolute;
  z-index: 100;
  left: 50vw;
  bottom: 0;
  height: 30vh;
  transform: translateX(-50%);
`;

export default function App() {
  const currentDirectory = mainAPI.getCurrentDirectory();
  if (!currentDirectory) {
    return (
      <Requirement>
        <p>No current directory</p>
      </Requirement>
    );
  }

  let configuration;
  try {
    configuration = loadConfiguration();
  } catch (error) {
    if (error instanceof FileNotFoundError) {
      return (
        <Requirement>
          <p>
            Configuration file is missing:
          </p>
          <p>
            {error.getFilePath()}
          </p>
        </Requirement>
      );
    }

    if (error instanceof InvalidJsonError) {
      return (
        <FatalError>
          <p>Invalid JSON file:</p>
          <p>{error.getFilePath()}</p>
        </FatalError>
      );
    }

    if (error instanceof InvalidYamlError) {
      return (
        <FatalError>
          <p>Invalid YAML file:</p>
          <p>{error.getFilePath()}</p>
        </FatalError>
      );
    }

    return (
      <FatalError>
        <p>Unknown error</p>
        <p>{error.message}</p>
      </FatalError>
    );
  }

  const environment = {
    currentDirectory
  };

  let customBackground;
  if (configuration.background) {
    const imagePath = mainAPI.resolve(currentDirectory, configuration.background);
    if (mainAPI.existsSync(imagePath)) {
      customBackground = <CustomBackground src={imagePath} />;
    }
  }

  if (configuration.sound && configuration.sound.background) {
    let volume = 100;
    if (configuration.sound.volume) {
      volume = configuration.sound.volume;
    }

    const soundPath = mainAPI.resolve(currentDirectory, configuration.sound.background);
    if (mainAPI.existsSync(soundPath)) {
      const audio = new Audio(soundPath);
      audio.volume = volume / 100;
      audio.loop = true;
      audio.play();

      environment.backgroundSound = audio;
    }
  }

  return (
    <ErrorBoundary>
      <EnvironmentContext.Provider value={environment}>
        <ConfigurationContext.Provider value={configuration}>
          <NavigationProvider>
            <Wrapper>
              {customBackground}
              <LeftSide />
              <RightSide />
              <Versus src={versusImagePath} />
              <StageSelector />
              <Fight />
              <HelpBar />
            </Wrapper>
          </NavigationProvider>
        </ConfigurationContext.Provider>
      </EnvironmentContext.Provider>
    </ErrorBoundary>
  );
}
