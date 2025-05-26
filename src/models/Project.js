import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

projectSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Project = model('Project', projectSchema);

export default Project;