import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Recruiter', 'Contractor'],
        required: true
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.role === 'Contractor'; }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collation: { locale: 'en', strength: 2 }
});

// // Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.error('[ERROR] Password hashing failed:', err);
        next(err);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        console.error('[ERROR] Password comparison failed:', err);
        throw err;
    }
};

const User = model('User', userSchema);

export default User;