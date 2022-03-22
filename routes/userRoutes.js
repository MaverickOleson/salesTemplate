const express = require('express');
const app = express();
const accountModel = require('../models/users');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
require('dotenv').config();

app.post('/users', async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const Login = await accountModel.create(req.body);
        res.status(201).json({ Login });
    } catch (error) {
        return res.status(400).send('name already exists');
    }
});
app.get('/users', async (req, res) => {
    try {
        const Login = await accountModel.findOne({ _id: req.query.username }).exec();
        if (await bcrypt.compare(req.query.password, Login.password)) {
            Login.token = crypto.randomBytes(128).toString('hex');
            const time = new Date();
            time.setDate(time.getDate() + 30);
            document.cookie = `username=${Login.token}; expires=${time.toUTCString()}; path=/;`;
            await accountModel.findOneAndUpdate({ _id: req.query.username }, Login);
            res.status(201).json({ Login });
        }
        else {
            crypto.randomBytes(128).toString('hex')
            return res.send('failure');
        }
    } catch (error) { res.status(500).json({ msg: error }) }
});
const deleteAccount = async (req, res) => {
    try {
        const Login = await accountModel.findByIdAndRemove(req.params.id);
        res.status(201).json({ Login });
    } catch (error) { res.status(500).json({ msg: error }) }
}
module.exports = app;