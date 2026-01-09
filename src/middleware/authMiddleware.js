const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).send({ success: false, message: "Token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user || user.isLogout) return res.status(401).send({ success: false, message: "Invalid token" });

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).send({ success: false, message: "Unauthorized", error: err.message });
    }
};