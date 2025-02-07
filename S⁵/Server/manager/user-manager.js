const { Users } = require('../models/index');

const createUser = async (data) => {
  try {
    const user = await Users.create(data);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

const getUserByUsername = async (username) => {
  try {
    const user = await Users.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

const getUserById = async (id) => {
  try {
    const user = await Users.findById(id).populate('expense');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

const updateUserById = async (id, data) => {
  try {
    const user = await Users.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}


module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUserById,
}