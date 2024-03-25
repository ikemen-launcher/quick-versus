export const SELECT_STAGE = "selectStage";

export default function selectStage(stage, stageIndex) {
  return {
    type: SELECT_STAGE,
    stage,
    stageIndex
  };
}
