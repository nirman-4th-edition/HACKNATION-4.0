import * as tf from "@tensorflow/tfjs";
import { loadDataset } from "./loadData.js";

async function trainModel() {
  console.log("Loading dataset...");
  const { tensors, labels } = await loadDataset();

  // Define CNN Model
  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [224, 224, 3],
      filters: 32,
      kernelSize: 3,
      activation: "relu",
    })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(
    tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: "relu" })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 128, activation: "relu" }));
  model.add(tf.layers.dense({ units: labels.shape[0], activation: "softmax" }));

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  // Train the model
  console.log("Training model...");
  await model.fit(tensors, labels, {
    epochs: 10,
    batchSize: 16,
    validationSplit: 0.2,
    shuffle: true,
  });

  console.log("Training complete!");

  // Save the model
  await model.save("./");
  console.log("Model saved!");
}

trainModel();
