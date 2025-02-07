import mongoose, { Schema } from 'mongoose';
import { ResumeData } from '../types/collections';
const ResumeSchema: Schema = new Schema({
    studentId: { type: String, ref: 'Student', required: true, index: true },
    resume: {
        name: { type: String},
        contact: {
            email: { type: String},
            phone: { type: String},
            linkedin: { type: String}
        },
        summary: { type: String},
        education: [{
            degree: { type: String},
            institution: { type: String},
            year: { type: String}
        }],
        experience: [{
            title: { type: String},
            company: { type: String},
            years: { type: String},
            description: { type: String}
        }],
        skills: [{ type: String}],
        publications: [{
            title: { type: String},
            authors: [{ type: String}],
            link: { type: String }
        }],
        projects: [{
            name: { type: String},
            link: { type: String},
            description: { type: String}
        }]
    }
}, {
    timestamps: false,
    versionKey: false
});

export default mongoose.model<ResumeData>('Resume', ResumeSchema);