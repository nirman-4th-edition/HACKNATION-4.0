import {asyncHandler} from '../utils/asyncHandler.js';
import {Impact} from '../models/impact.model.js';
import {ApiError} from '../utils/ApiError.js';



const trackSustainabilityMetrics = asyncHandler(async (userId) => {
    const { id, foodSaved, co2Reduced } = req.body;
    let impact = await Impact.findOne({ user: userId });


    if (!impact) {
        impact = new Impact({
            user: id,
            foodSaved: 0,
            CO2Reduced: 0
        });
    }

    
    impact.foodSaved += foodSaved;
    impact.CO2Reduced += co2Reduced;
    impact.lastUpdated = Date.now();

    await impact.save();
    res.status(200).json(impact);
});



const getImpactData = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const impact = await Impact.findOne({ user: userId });

    if (!impact) {
    throw new ApiError(404, 'Impact metrics not found');
    }

    res.status(200).json(impact);
});


export{
    trackSustainabilityMetrics,
    getImpactData
}