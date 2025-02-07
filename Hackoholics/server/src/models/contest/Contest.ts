import mongoose, { Schema } from 'mongoose';
import { Contest } from '../../types/collections';

const ContestSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    timeLimit: { type: Number, required: true },
    participants: [{ type: String, ref: 'Student' }],
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' }
}, {
    timestamps: true,
    versionKey: false
}); 

export default mongoose.model<Contest>('Contest', ContestSchema);