import {asyncHandler} from '../utils/asyncHandler.js';
import { Charity } from '../models/charity.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createCharity = asyncHandler(async (req, res) => {
  const { name, contactInfo, description, location } = req.body;

  if ([name, contactInfo, description, location].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const charity = new Charity({
    name,
    contactInfo,
    description,
    location
  });

  await charity.save();

  res.status(201).json(new ApiResponse(201, charity, "Charity created successfully"));
});

const updateCharity = asyncHandler(async (req, res) => {
  const { charityId } = req.params;
  const { name, contactInfo, description, location } = req.body;

  const charity = await Charity.findById(charityId);

  if (!charity) {
    throw new ApiError(404, 'Charity not found');
  }

  charity.name = name || charity.name;
  charity.contactInfo = contactInfo || charity.contactInfo;
  charity.description = description || charity.description;
  charity.location = location || charity.location;

  await charity.save();

  res.status(200).json(new ApiResponse(200, charity, "Charity updated successfully"));
});


const deleteCharity = asyncHandler(async (req, res) => {
  const { charityId } = req.params;

  const charity = await Charity.findById(charityId);

  if (!charity) {
    throw new ApiError(404, 'Charity not found');
  }

  await charity.remove();

  res.status(200).json(new ApiResponse(200, null, "Charity deleted successfully"));
});


const getCharities = asyncHandler(async (req, res) => {
  const charities = await Charity.find();

  res.status(200).json(new ApiResponse(200, charities, "Charities retrieved successfully"));
});

export {
  createCharity,
  updateCharity,
  deleteCharity,
  getCharities
};