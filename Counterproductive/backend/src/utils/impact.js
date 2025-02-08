import Impact from '../models/impact.model.js';
import ApiError from './ApiError.js';



export const updateImpactMetrics = async (userId, foodSaved, co2Reduced) => {
  try {
    let impact = await Impact.findOne({ user: userId });

    if (!impact) {
      impact = new Impact({
        user: userId,
        foodSaved: 0,
        CO2Reduced: 0
      });
    }

    impact.foodSaved += foodSaved;
    impact.CO2Reduced += co2Reduced;
    impact.lastUpdated = Date.now();

    await impact.save();
    return impact;
  } catch (error) {
    throw new ApiError(500, 'Error updating impact metrics');
  }
};



export const getImpactMetrics = async (userId) => {
  try {
    const impact = await Impact.findOne({ user: userId });

    if (!impact) {
      throw new ApiError(404, 'Impact metrics not found');
    }

    return impact;
  } catch (error) {
    throw new ApiError(500, 'Error retrieving impact metrics');
  }
};