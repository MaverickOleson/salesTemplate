const express = require('express');
const app = express();
const accountModel = require('../models/users');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
require('dotenv').config();

app.post('/users', async (req, res, next) => {
    try {
        if (!req.body._id || !req.body.password) return res.redirect('/register?alert=Empty username or password')
        if ((await accountModel.find({ _id: req.body._id }).exec()).length) return res.redirect('/register?alert=Username already taken');
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await accountModel.create(req.body);
        res.redirect('/login');
    } catch (error) { res.status(500).json({ msg: error }) }
});
app.post('/users/:id', async (req, res, next) => {
    try {
        console.log(req.body, req.params);
        return next();
        const Login = await accountModel.findOne({ _id: req.params.id }).exec();
        if (!Login) return res.redirect('/login/?alert=Invalid username or password');
        if (req.cookies.token) {
            if (req.cookies.token == Login.token) {
                Login.info = req.body;
                await accountModel.findOneAndUpdate({ _id: req.params.id }, Login).exec();
                return res.redirect('/yourInfo');
            };
            return res.redirect('/login?alert=Invalid username or password');
        }
        return res.redirect('/login/?alert=Invalid username or password');
    } catch (error) { res.status(500).json({ msg: error }) }
});
app.get('/users', async (req, res) => {
    try {
        const Login = await accountModel.findOne({ _id: req.query.username }).exec();
        if (!Login) return res.redirect('/login/?alert=Invalid username or password');
        if (await bcrypt.compare(req.query.password, Login.password)) {
            Login.token = crypto.randomBytes(64).toString('hex');
            const time = new Date();
            time.setDate(time.getDate() + 30);
            res.cookie('token', Login.token, { expires: time });
            res.cookie('username', req.query.username);
            await accountModel.findOneAndUpdate({ _id: req.query.username }, Login);
            res.redirect('/yourInfo');
        }
        else {
            return res.redirect('/login?alert=Invalid username or password')
        }
    } catch (error) { res.status(500).json({ msg: error }) }
});
app.post('/logout', async (req, res) => {
    try {
        const time = new Date();
        time.setDate(time.getDate() - 1);
        res.cookie('token', '', { expire: time });
        res.cookie('username', '', { expire: time });
        res.redirect('/login');
    } catch (error) { res.status(500).json({ msg: error }) }
});
const deleteAccount = async (req, res) => {
    try {
        const Login = await accountModel.findByIdAndRemove(req.params.id);
        res.status(201).json({ Login });
    } catch (error) { res.status(500).json({ msg: error }) }
}
module.exports = app;