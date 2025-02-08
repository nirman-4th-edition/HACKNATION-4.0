import * as tf from "@tensorflow/tfjs";
import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";

const dataPath = "./soil_types";

function getSoilClasses(): string[] {
  return fs.readdirSync(dataPath).filter((file) => {
    return fs.statSync(path.join(dataPath, file)).isDirectory();
  });
}

const soilClasses = getSoilClasses();

export async function loadImageAsTensor(
  filePath: string
): Promise<tf.Tensor3D> {
  const img = await loadImage(filePath);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height);

  return tf.tidy(() =>
    tf.browser
      .fromPixels({ data: new Uint8Array(data.buffer), width, height })
      .toFloat()
      .div(255)
  ) as any;
}

async function loadDataset(): Promise<{
  tensors: tf.Tensor3D;
  labels: tf.Tensor2D;
}> {
  const images: tf.Tensor3D[] = [];
  const labels: number[] = [];

  const batchSize = 32; // Adjust batch size as needed
  let batchImages: tf.Tensor3D[] = [];
  let batchLabels: number[] = [];

  for (const soilType of soilClasses) {
    const folderPath = path.join(dataPath, soilType);
    const imageFiles = fs.readdirSync(folderPath);

    for (const file of imageFiles) {
      const filePath = path.join(folderPath, file);
      const imgTensor = await loadImageAsTensor(filePath);
      batchImages.push(imgTensor);
      batchLabels.push(soilClasses.indexOf(soilType));

      if (batchImages.length >= batchSize) {
        const batchTensors = tf.stack(batchImages) as tf.Tensor3D;
        const batchLabelTensor = tf.tensor1d(batchLabels, "int32");
        const oneHotLabels = tf.oneHot(
          batchLabelTensor,
          soilClasses.length
        ) as tf.Tensor2D;

        images.push(batchTensors);
        labels.push(soilClasses.length);

        batchImages = [];
        batchLabels = [];
      }
    }
  }

  // Process any remaining images in the last batch
  if (batchImages.length > 0) {
    const batchTensors = tf.stack(batchImages) as tf.Tensor3D;
    const batchLabelTensor = tf.tensor1d(batchLabels, "int32");
    // const oneHotLabels = tf.oneHot(batchLabelTensor, soilClasses.length);

    images.push(batchTensors);
    labels.push(soilClasses.length);
  }

  const tensors = tf.concat(images) as tf.Tensor3D;
  const labelTensor = tf.concat(labels) as tf.Tensor2D;

  tf.dispose(images);

  return {
    tensors,
    labels: labelTensor,
  };
}

export { loadDataset };
