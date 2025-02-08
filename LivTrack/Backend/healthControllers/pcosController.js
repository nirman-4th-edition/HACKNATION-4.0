const PcosPcod = require("../healthModels/pcosModel");

// Add PCOS/PCOD Metrics
exports.addPcosMetrics = async (req, res) => {
  try {
    const newMetric = await PcosPcod.create({
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

// Get All PCOS/PCOD Metrics for a User
exports.getPcosMetrics = async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (req.query.date) {
      filter.date = req.query.date;
    }
    const metrics = await PcosPcod.find(filter).sort({ createdAt: 1 });
    res.status(200).json({
      status: "success",
      data: { metrics },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
// Update a Specific PCOS/PCOD Metric
exports.updatePcosMetrics = async (req, res) => {
  try {
    const updatedMetric = await PcosPcod.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensure model validation
      }
    );
    if (!updatedMetric) {
      return res
        .status(404)
        .json({ status: "fail", message: "No metric found with that ID" });
    }
    res.status(200).json({
      status: "success",
      data: { metric: updatedMetric },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete a PCOS/PCOD Metric
exports.deletePcosMetrics = async (req, res) => {
  try {
    const deletedMetric = await PcosPcod.findByIdAndDelete(req.params.id);
    if (!deletedMetric) {
      return res
        .status(404)
        .json({ status: "fail", message: "No metric found with that ID" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getpcosMetricsGraph = async (req, res) => {
  try {
    const data = await PcosPcod.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          hormones: 1,
          thyroid: 1,
          glucoseInsulin: 1,
          prolactin: 1,
          healthMetrics: 1,
          lipidProfile: 1,
          ultrasoundFindings: 1,
          testType: 1,
          source: 1,
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
