import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function register(userData) {
    return await User.create(userData);
}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Wrong email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Wrong email or password");
    }

    const payload = {
        id: user._id,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.SECRET);

    return token;
}

export default {
    register,
    login
}