const mediasoup = require("mediasoup");

const workerSettings = {
  logLevel: "warn",
  rtcMinPort: 10000,
  rtcMaxPort: 20000,
};

const mediaCodecs = [
  {
    kind: "audio",
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: "video",
    mimeType: "video/VP8",
    clockRate: 90000,
    parameters: {
      "x-google-start-bitrate": 1000,
    },
  },
  {
    kind: "video",
    mimeType: "video/H264",
    clockRate: 90000,
    parameters: {
      "level-asymmetry-allowed": 1,
      "packetization-mode": 1,
      "profile-level-id": "42e01f",
    },
  },
];

let worker;
let router;

const createWorker = async () => {
  worker = await mediasoup.createWorker(workerSettings);

  worker.on("died", () => {
    console.error("Mediasoup worker has died. Restarting is required.");
    process.exit(1);
  });

  router = await worker.createRouter({ mediaCodecs });
  console.log("✅ Mediasoup worker & router created");
};

const getRouter = () => {
  if (!router) {
    throw new Error("Router not initialized. Call createWorker() first.");
  }
  return router;
};

module.exports = { createWorker, getRouter };
