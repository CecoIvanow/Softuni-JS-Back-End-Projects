import User from "../models/User.js";

async function register(userData) {
    return await User.create(userData);
}

export default {
    register
}