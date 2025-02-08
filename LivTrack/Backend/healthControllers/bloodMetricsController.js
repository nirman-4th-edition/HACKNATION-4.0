const BloodMetric = require("../healthModels/bloodMetricModel");

// Add Blood Metrics
exports.addBloodMetrics = async (req, res) => {
  try {
    const newMetric = await BloodMetric.create({
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

// Get All Blood Metrics for a User
exports.getBloodMetrics = async (req, res) => {
  try {
    let filter = { user: req.user.id };
    if (req.query.date) {
      filter.date = new Date(req.query.date); // Fetch by specific date
    }

    const metrics = await BloodMetric.find(filter).sort({ date: 1 });

    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Update Blood Metrics
exports.updateBloodMetrics = async (req, res) => {
  try {
    const updatedMetric = await BloodMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensure model validation
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

// Get User History for Graphing
exports.getBloodMetricsGraph = async (req, res) => {
  try {
    const data = await BloodMetric.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(req.user.id) }, // Get only user's data
      },
      { $sort: { date: 1 } }, // Sort by date (oldest to newest)
      {
        $project: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }, // Convert date format
          },
          totalCholesterol: {
            $arrayElemAt: ["$cholesterolLevels.totalCholesterol", -1],
          },
          ldl: { $arrayElemAt: ["$cholesterolLevels.ldl", -1] },
          hdl: { $arrayElemAt: ["$cholesterolLevels.hdl", -1] },
          triglycerides: {
            $arrayElemAt: ["$cholesterolLevels.triglycerides", -1],
          },
          vldl: { $arrayElemAt: ["$cholesterolLevels.vldl", -1] },
          nonHdlCholesterol: {
            $arrayElemAt: ["$cholesterolLevels.nonHdlCholesterol", -1],
          },
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

// Delete a Blood Metric Entry
exports.deleteBloodMetric = async (req, res) => {
  try {
    const metric = await BloodMetric.findByIdAndDelete(req.params.id);
    if (!metric) {
      return res
        .status(404)
        .json({ status: "fail", message: "Metric not found" });
    }
    res.status(204).json({ status: "success", data: null }); // 204 means no content
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
