const mongoose = require("mongoose");
const CholesterolMetric = require("../healthModels/cholesterolMetricModel");

// Add Cholesterol Metrics
exports.addCholesterolMetrics = async (req, res) => {
  try {
    const newMetric = await CholesterolMetric.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json({ status: "success", data: { metric: newMetric } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get Cholesterol Metrics (with optional date filter)
exports.getCholesterolMetrics = async (req, res) => {
  try {
    let filter = { user: req.user.id };
    if (req.query.date) {
      filter.date = new Date(req.query.date); // Fetch by specific date
    }

    const metrics = await CholesterolMetric.find(filter).sort({ date: 1 });
    res.status(200).json({ status: "success", data: { metrics } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Update Cholesterol Metrics
exports.updateCholesterolMetrics = async (req, res) => {
  try {
    const updatedMetric = await CholesterolMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json({ status: "success", data: { metric: updatedMetric } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete Cholesterol Metric
exports.deleteCholesterolMetric = async (req, res) => {
  try {
    const metric = await CholesterolMetric.findByIdAndDelete(req.params.id);
    if (!metric) {
      return res
        .status(404)
        .json({ status: "fail", message: "Metric not found" });
    }
    res.status(204).json({ status: "success", data: null }); // 204 = No Content
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get Cholesterol Metrics Graph (Trends Over Time)
exports.getCholesterolMetricsGraph = async (req, res) => {
  try {
    const data = await CholesterolMetric.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.user.id) },
      },
      { $sort: { date: 1 } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          ldl: { $arrayElemAt: ["$cholesterolLevels.ldl", -1] },
          hdl: { $arrayElemAt: ["$cholesterolLevels.hdl", -1] },
          triglycerides: {
            $arrayElemAt: ["$cholesterolLevels.triglycerides", -1],
          },
          units: "$units", // Ensure units are included
        },
      },
      {
        $group: {
          _id: "$date",
          ldl: { $last: "$ldl" },
          hdl: { $last: "$hdl" },
          triglycerides: { $last: "$triglycerides" },
          units: { $first: "$units" }, // Use $first to retain units if available
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          ldl: 1,
          hdl: 1,
          triglycerides: 1,
          units: {
            $ifNull: [
              "$units",
              {
                totalCholesterol: "mg/dL",
                ldl: "mg/dL",
                hdl: "mg/dL",
                triglycerides: "mg/dL",
                vldl: "mg/dL",
                nonHdlCholesterol: "mg/dL",
              },
            ],
          },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        metrics: data,
        referenceUnits: {
          ldl: "mg/dL",
          hdl: "mg/dL",
          triglycerides: "mg/dL",
        },
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
