import {asyncHandler} from '../utils/asyncHandler.js';
import { Category } from '../models/category.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory, level } = req.body;

  if (!name || !level) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const category = new Category({
    name,
    parentCategory: parentCategory || null,
    level
  });

  await category.save();

  res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, parentCategory, level } = req.body;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  category.name = name || category.name;
  category.parentCategory = parentCategory || category.parentCategory;
  category.level = level || category.level;

  await category.save();

  res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
});


const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  await category.remove();

  res.status(200).json(new ApiResponse(200, null, "Category deleted successfully"));
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(new ApiResponse(200, categories, "Categories retrieved successfully"));
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
};