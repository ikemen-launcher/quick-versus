import React, { useState, useEffect } from "react";
import useStages from "../configuration/useStages.hook";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import useInputPlayerTwo from "../input/useInputPlayerTwo.hook";
import { A, LEFT, RIGHT } from "../input/event";
import useStageName from "./useStageName.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import selectStage from "../navigation/action/selectStage.action";
import Title from "./title.view";
import Name from "./name.view";
import Preview from "./preview.view";
import getSelectableStages from "./util/getSelectableStages";
import useNavigation from "../navigation/useData.hook";

export default function SelectingStageByPlayers() {
  const { stageIndex } = useNavigation();
  const dispatch = useNavigationDispatch();
  const stages = useStages();
  const inputPlayerOne = useInputPlayerOne();
  const inputPlayerTwo = useInputPlayerTwo();
  const [newStageIndex, setStageIndex] = useState(stageIndex || 0);
  const stage = stages[newStageIndex];
  const name = useStageName(stage);

  useEffect(() => {
    const previous = () => {
      if (newStageIndex > 0) {
        setStageIndex(newStageIndex - 1);
      } else {
        setStageIndex(stages.length - 1);
      }
    };
    const next = () => {
      setStageIndex((newStageIndex + 1) % stages.length);
    };
    const confirm = () => {
      if (stage.random) {
        const selectableStages = getSelectableStages(stages);
        const randomStage = selectableStages[Math.floor(Math.random() * selectableStages.length)];
        dispatch(selectStage(randomStage, newStageIndex));
      } else {
        dispatch(selectStage(stage, newStageIndex));
      }
    };

    inputPlayerOne.addEventListener(LEFT, previous);
    inputPlayerOne.addEventListener(RIGHT, next);
    inputPlayerOne.addEventListener(A, confirm);
    inputPlayerTwo.addEventListener(LEFT, previous);
    inputPlayerTwo.addEventListener(RIGHT, next);
    inputPlayerTwo.addEventListener(A, confirm);

    return () => {
      inputPlayerOne.removeEventListener(LEFT, previous);
      inputPlayerOne.removeEventListener(RIGHT, next);
      inputPlayerOne.removeEventListener(A, confirm);
      inputPlayerTwo.removeEventListener(LEFT, previous);
      inputPlayerTwo.removeEventListener(RIGHT, next);
      inputPlayerTwo.removeEventListener(A, confirm);
    };
  }, [inputPlayerOne, inputPlayerTwo, stage, stages, stageIndex, dispatch]);

  const nonRandomStages = stages.filter((stage) => !stage.random);
  const indexInNonRandomStages = nonRandomStages.indexOf(stage);
  let stagePosition = ``;
  if (indexInNonRandomStages >= 0) {
    stagePosition = `${indexInNonRandomStages + 1}/${nonRandomStages.length}`;
  }

  return (
    <>
      <Preview stage={stage} />
      <Title>Stage {stagePosition}</Title>
      <Name>{name}</Name>
    </>
  );
}
