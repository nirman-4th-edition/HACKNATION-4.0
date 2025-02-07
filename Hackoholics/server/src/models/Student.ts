import mongoose, { Schema } from 'mongoose';
import { IStudent } from '../types/collections';


const StudentSchema: Schema = new Schema({
    _id: { type: String, required: true }, // Registration number
    userId: { type: String, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    section: { type: String, required: true },
    branch: { type: String, required: true },
    admissionYear: { type: Number, required: true },
    resumeId: { type: Schema.Types.ObjectId, ref: 'Resume', default: null },
    contests: [{
        contestId: { type: Schema.Types.ObjectId, ref: 'Contest' },
        score: { type: Number, required: true },
    }],
    feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    companies: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    placedAt: [{ type: Schema.Types.ObjectId, ref: 'Company', default: null }],
    completedCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company' }]
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model<IStudent>('Student', StudentSchema);