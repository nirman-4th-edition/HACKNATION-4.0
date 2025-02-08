const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../userModels/userModel");

exports.registerUser = async (req, res) => {
  const { name, email, password, age, weight, height } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(
      decoded.id,
      "name email age weight height"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
    });
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Basic Info (Age, Height, Weight)
exports.updateBasicInfo = async (req, res) => {
  try {
    const { age, weight, height } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.age = age || user.age;
    user.weight = weight || user.weight;
    user.height = height || user.height;
    await user.save();

    res.status(200).json({ message: "Basic info updated successfully" });
  } catch (error) {
    console.error("Error updating basic info:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Security Info (Name, Email, Password)
exports.updateSecurityInfo = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "Security info updated successfully" });
  } catch (error) {
    console.error("Error updating security info:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
