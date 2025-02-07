const EyeMetric = require("../healthModels/eyeMetricModel");
const mongoose = require("mongoose");

// Add Eye Metrics
exports.addEyeMetrics = async (req, res) => {
  try {
    const newMetric = await EyeMetric.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json({
      status: "success",
      data: { metric: newMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get Eye Metrics with optional date filtering
exports.getEyeMetrics = async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (req.query.date) {
      filter.date = req.query.date;
    }
    const metrics = await EyeMetric.find(filter).sort({ date: 1 });
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Update Eye Metrics
exports.updateEyeMetrics = async (req, res) => {
  try {
    const updatedMetric = await EyeMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: { metric: updatedMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete Eye Metric
exports.deleteEyeMetric = async (req, res) => {
  try {
    const metric = await EyeMetric.findByIdAndDelete(req.params.id);
    if (!metric) {
      return res
        .status(404)
        .json({ status: "fail", message: "Metric not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get Eye Metrics Graph Data
exports.getEyeMetricsGraph = async (req, res) => {
  try {
    const data = await EyeMetric.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $sort: { date: 1 },
      },
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          rightEye: "$rightEye",
          leftEye: "$leftEye",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: { metrics: data },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
