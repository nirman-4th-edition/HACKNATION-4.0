import mongoose, { Schema, Document } from 'mongoose';
import { IFeedback } from '../types/collections';

const FeedbackSchema: Schema = new Schema(
    {
        studentId: [{ type: String, ref: 'Student', required: true, index: true }],
        companyName: { type: String, required: true },
        type: { type: String, required: true, enum: ['pi', 'gd', 'training'] },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);