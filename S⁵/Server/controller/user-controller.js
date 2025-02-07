const bcrypt = require('bcrypt');
const { createUser, getUserById, getUserByUsername, updateUserById } = require('../manager/user-manager');

const createNewUser = async(req, res) => {
  try {
    const data = await formatPayload(req.body);
    const user = await createUser(data);
    if (user) {
      res.status(201).json({
        message: 'User created successfully',
        user
      });
    }
  } catch (error) {
    console.error("Error creating new user", error);
    res.status(400).json({ error: "Error creating new user" });
  }
}

const loginUser = async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (user) {
      const check = await comparePassword(password, user.password);
      if (check) {
        res.status(200).json({ message: 'Logged in successfully', user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(400).json({ error: "Error creating new user" });
  }
}

const getUserDetails = async(req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        firstName: user.fname,
        lastName: user.lname,
        email: user.email,
        phoneNumber: user.phone_no,
        expenses: {
          expenseId: user.expense[0]._id,
          totalAmount: user.expense[0].total_amount,
          travelExpense: user.expense[0].travel,
          foodExpense: user.expense[0].food,
          utilitiesExpense: user.expense[0].utilities,
          healthExpense: user.expense[0].health,
          entertainmentExpense: user.expense[0].entertainment,
          shoppingExpense: user.expense[0].shopping,
        }
      }
      res.status(200).json(payload);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("Error getting user details", error);
    res.status(400).json({ error: "Error getting user details" });
  }
}

const updateUserDetails = async(req, res) => {
  try {
    const { id } = req.params;
    const data = await formatPayload(req.body);
    const updatedUser = await updateUserById(id, data);
    if (updatedUser) {
      res.status(200).json({ message: 'User details updated successfully' });
    }
  } catch (error) {
    console.error("Error updating user details", error);
    res.status(400).json({ error: "Error updating user details" });
  }
}

const formatPayload = async (payload) => {
  const { firstName, lastName, username, email, password, phoneNumber } = payload;
  const hashedPassword = await hashPassword(password);

  const data = {
    ...(firstName !== undefined && { fname: firstName }),
    ...(lastName !== undefined && { lname: lastName }),
    ...(username !== undefined && { username: username }),
    ...(email !== undefined && { email: email }),
    ...(password !== undefined && { password: hashedPassword }),
    ...(phoneNumber !== undefined && { phone_no: phoneNumber }),
  }
  
  return data;
}

const hashPassword = async (password) => {
  const saltRounds = 3;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    return null; 
  }
}

const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error(err);
    throw new Error('Passwords do not match');
  }
}

module.exports = {
  createNewUser,
  loginUser,
  getUserDetails,
  updateUserDetails
}