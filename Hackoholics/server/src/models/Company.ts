import mongoose, { Schema, Document } from 'mongoose';
import { ICompany } from '../types/collections';

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    hr: [{ type: Schema.Types.ObjectId, ref: 'HR' }],
    shortlistedStudents: [{ type: String, ref: 'Student' }],
    selectedStudents: [{ type: String, ref: 'Student' }],
    completedStudents: [{ type: String, ref: 'Student' }],
    tags: [{ type: String }]
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model<ICompany>('Company', CompanySchema);