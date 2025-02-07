import mongoose, { Schema } from 'mongoose';
import { Result } from '../../types/collections';

const ResultSchema: Schema = new Schema({
    contestId: { type: mongoose.Types.ObjectId, ref: 'Contest', required: true },
    studentId: { type: String, ref: 'Student', required: true },
    score: { type: Number, required: true },
    position: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model<Result>('Result', ResultSchema);