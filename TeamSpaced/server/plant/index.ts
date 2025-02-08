import express, { Response } from "express";
import * as tf from "@tensorflow/tfjs";
import fs from "fs";
import csv from "csv-parser";
import axios from "axios";
import conv from "node-temperature-converter";

interface CropData {
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  label: string;
}

const router = express.Router();

let lati = 85.80054171123192,
  loni = 20.250563612332872;

async function suggestCrop(
  temp: number,
  humidity: number,
  rainfall: number,
  pH: number,
  res: Response
): Promise<string> {
  let predictedCrop = "";
  const dataset: CropData[] = [];
  fs.createReadStream("./datasets/crop_attributes/crop_data.csv")
    .pipe(csv())
    .on("data", (row: any) => {
      dataset.push({
        temperature: parseFloat(row.temperature),
        humidity: parseFloat(row.humidity),
        ph: parseFloat(row.ph),
        rainfall: parseFloat(row.rainfall),
        label: row.label,
      });
    })
    .on("end", async () => {
      const labels = Array.from(new Set(dataset.map((item) => item.label)));
      const labelToIndex = new Map(
        labels.map((label, index) => [label, index])
      );

      const features = dataset.map((item) => [
        item.temperature / 40,
        item.humidity / 100,
        item.ph / 14,
        item.rainfall / 300,
      ]);

      const encodedLabels = dataset.map((item) => {
        const index = labelToIndex.get(item.label)!;
        const oneHot = new Array(labels.length).fill(0);
        oneHot[index] = 1;
        return oneHot;
      });

      const featureTensor = tf.tensor2d(features);
      const labelTensor = tf.tensor2d(encodedLabels);

      const model = tf.sequential();
      model.add(
        tf.layers.dense({
          units: 16,
          activation: "relu",
          inputShape: [4],
        })
      );
      model.add(
        tf.layers.dense({ units: labels.length, activation: "softmax" })
      );

      model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
      });

      await model.fit(featureTensor, labelTensor, {
        epochs: 10,
        batchSize: 32,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch + 1}: Loss = ${logs!.loss}`);
          },
        },
      });

      const newData = tf.tensor2d([
        [temp / 40, humidity / 100, pH / 14, rainfall / 300],
      ]);

      const prediction = model.predict(newData) as tf.Tensor;
      const predictedIndex = prediction.argMax(1).dataSync()[0];
      predictedCrop = labels[predictedIndex];
      res.send(predictedCrop);
    });
  return predictedCrop;
}

router.post("/", async (req, res) => {
  let { lat, lon, image } = req.body;

  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${loni}&appid=bf0e84308ebc153f6348ffec3d56361d`
    );
    const attributes = weatherData.data.main;
    const temp = new conv.Fahrenheit(attributes.temp);

    await suggestCrop(temp.toCelsius(), attributes.humidity, 160, 3.5, res);
  } catch (error) {}
});

export default router;
