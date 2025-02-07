import mongoose,{Schema} from 'mongoose';

const foodListingSchema = new Schema({
    providerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    food: {
        type: Schema.Types.ObjectId,
        ref:"Food",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number
    },
    photo: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    }
},{timestamps:true});

foodListingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const FoodListing = mongoose.model('FoodListing', foodListingSchema);
