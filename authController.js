const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword });
    try {
        const savedAdmin = await newAdmin.save();
        res.status(201).send(savedAdmin);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).send('Username or password is wrong');

    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send(token);
};
