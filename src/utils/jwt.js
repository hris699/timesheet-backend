import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const { sign, verify } = jwt;

const generateToken = (user) => {
    return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const verifyToken = (token) => {
    return verify(token, process.env.JWT_SECRET);
};

export default {
    generateToken,
    verifyToken,
};