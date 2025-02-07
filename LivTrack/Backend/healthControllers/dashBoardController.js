const CholesterolTestMetric = require("../healthModels/cholesterolMetricModel");
const BloodTestMetric = require("../healthModels/bloodMetricModel");
const PCOSTestMetric = require("../healthModels/pcosModel");
const EyeTestMetric = require("../healthModels/eyeMetricModel");

// Helper function: Calculate basic statistics
const calculateStats = (values) => ({
  average: values.length
    ? values.reduce((a, b) => a + b, 0) / values.length
    : null,
  min: values.length ? Math.min(...values) : null,
  max: values.length ? Math.max(...values) : null,
  latest: values.length ? values[values.length - 1] : null,
  trend: values.slice(-3), // Last 3 readings for trend analysis
});

exports.getHealthDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all health metrics for the user
    const cholesterolTests = await CholesterolTestMetric.find({ user: userId })
      .sort({ date: 1 })
      .lean();
    const bloodTests = await BloodTestMetric.find({ user: userId })
      .sort({ date: 1 })
      .lean();
    const pcosTests = await PCOSTestMetric.find({ user: userId })
      .sort({ date: 1 })
      .lean();
    const eyeTests = await EyeTestMetric.find({ user: userId })
      .sort({ date: 1 })
      .lean();

    // Process cholesterol data
    const cholesterolData = processHealthMetrics(
      cholesterolTests,
      "cholesterolLevels"
    );
    const bloodData = processHealthMetrics(bloodTests, "bloodLevels");
    const pcosData = processHealthMetrics(pcosTests, "pcosLevels");
    const eyeData = processHealthMetrics(eyeTests, "eyeMetrics");

    // Combine data
    const dashboard = {
      cholesterol: cholesterolData,
      blood: bloodData,
      pcos: pcosData,
      eye: eyeData,
      metadata: {
        testCount: {
          cholesterol: cholesterolTests.length,
          blood: bloodTests.length,
          pcos: pcosTests.length,
          eye: eyeTests.length,
        },
        firstTest: {
          cholesterol: cholesterolTests[0]?.date,
          blood: bloodTests[0]?.date,
          pcos: pcosTests[0]?.date,
          eye: eyeTests[0]?.date,
        },
        lastTest: {
          cholesterol: cholesterolTests[cholesterolTests.length - 1]?.date,
          blood: bloodTests[bloodTests.length - 1]?.date,
          pcos: pcosTests[pcosTests.length - 1]?.date,
          eye: eyeTests[eyeTests.length - 1]?.date,
        },
      },
    };

    res.status(200).json({
      status: "success",
      data: dashboard,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to generate dashboard",
      error: err.message,
    });
  }
};

// Process multiple health metrics
const processHealthMetrics = (tests, metricField) => {
  if (!tests.length) return null;

  return Object.keys(tests[0][metricField] || {}).reduce((acc, metric) => {
    const allReadings = tests.flatMap((test) =>
      test[metricField][metric].map((value, index) => ({
        value,
        date: test.date,
        unit: test.units?.[metric] || "",
        source: test.source,
        method: test.testMethod,
      }))
    );

    acc[metric] = {
      ...calculateStats(allReadings.map((r) => r.value)),
      unit: tests[0]?.units?.[metric] || "",
      referenceRange: tests[0]?.referenceRanges?.[metric] || "",
      history: allReadings,
    };
    return acc;
  }, {});
};
