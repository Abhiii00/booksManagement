const userModel = require('../model/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ------------------ REGISTER ------------------ */
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) return res.status(400).send({ success: false, message: "Email already exists" });

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashedPass });

        return res.status(201).send({ success: true, message: "User created successfully", data: user });

    } catch (err) {
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};

/* ------------------ LOGIN ------------------ */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).send({ success: false, message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).send({ success: false, message: "Invalid password" });

        await user.save();

        const accessToken = jwt.sign({ id: user._id, type: "access" }, process.env.JWT_SECRET, { expiresIn: "12h" });

        return res.status(200).send({
            success: true,
            message: "Login successful",
            data: { user: { _id: user._id, name: user.name, email: user.email }, accessToken }
        });

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};
