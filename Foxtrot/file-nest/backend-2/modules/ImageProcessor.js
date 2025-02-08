import axios from "axios";

/**
 * Calls the Flask API to process an image given its URL.
 * @param {string} fileUrl - The URL of the file to process.
 * @returns {Object|null} - The JSON result from the Flask API or null if there was an error.
 */

async function processImage(fileUrl, fileType) {
  try {
    console.log("Imgaeprocessor: : ", fileType);

    const response = await axios.post("http://localhost:5000/extract", {
      url: fileUrl,
      type: fileType,
    });
    // console.log("Response from Flask API:", response.data);
    return response.data; // Expecting something like { Result: { Subject: ..., Chapter: ..., Frequency: ... } }
  } catch (error) {
    console.error("Error processing image:", error);
    return null;
  }
}

export { processImage };
