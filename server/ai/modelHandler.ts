import * as tf from "@tensorflow/tfjs-node";
import path from "path";

export async function loadModel(name: string) {
  const modelPath = path.join(
    process.cwd(),
    "public",
    "models",
    name,
    "model.json"
  );
  return await tf.loadGraphModel(`file://${modelPath}`);
}

export async function predictAction(
  model: tf.GraphModel,
  state: number[],
  actions: number[][]
) {
  const inputData = actions.map((action) => {
    return [...state, ...action];
  });
  const prediction = model.predict(tf.tensor2d(inputData)) as tf.Tensor;
  const predictionData = prediction.dataSync();
  const predictedActionIndex = predictionData.indexOf(
    Math.max(...predictionData)
  );
  if (isUndefined(actions[predictedActionIndex])) {
    throw new Error("Echec de la prédiction de l'action.");
  }
  return actions[predictedActionIndex].join("");
}
