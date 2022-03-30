const express = require('express');
const app = express();
const userModel = require('../models/users');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
require('dotenv').config();

app.post('/users', async (req, res, next) => {
    try {
        if (!req.body._id || !req.body.password) return res.redirect('/register?alert=Empty username or password')
        if (await userModel.findById(req.body._id).exec()) return res.redirect('/register?alert=Username already taken');
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await userModel.create(req.body);
        res.redirect('/login');
    } catch (error) { res.status(500).json({ msg: error }) }
});
app.post('/users/:id', async (req, res, next) => {
    try {
        var Login = await userModel.findById(req.params.id).exec();
        if (!Login) return res.redirect('/login?alert=Invalid username or password');
        if (req.cookies.token) {
            if (req.cookies.token == Login.token) {
                const info = JSON.parse(Login.info);
                if (req.body.delete) {
                    await userModel.findByIdAndDelete(req.params.id).exec();
                    return res.redirect('/');
                }
                for (const key in req.body) {
                    if (key == 'newInfo') {
                        for (var i = 0; i < req.body[key].length; i += 2) {
                            if (!req.body[key][i] || !req.body[key][i + 1]) {
                                continue;
                            }
                            info[req.body[key][i]] = req.body[key][i + 1];
                        }
                    }
                    else if (req.body[key]) {
                        info[key] = req.body[key];
                    }
                    else {
                        delete info[key];
                    }
                }
                Login.info = JSON.stringify(info);
                await userModel.findByIdAndUpdate(req.params.id, Login).exec();
                return res.redirect('/yourInfo');
            };
            return res.redirect('/login?alert=Invalid username or password');
        }
        res.redirect('/login?alert=Invalid username or password');
    } catch (error) { res.status(500).json({ msg: error }) }
});
app.get('/users', async (req, res) => {
    try {
        const Login = await userModel.findById(req.query.username).exec();
        if (!Login) return res.redirect('/login?alert=Invalid username or password');
        if (await bcrypt.compare(req.query.password, Login.password)) {
            Login.token = crypto.randomBytes(64).toString('hex');
            const time = new Date();
            time.setDate(time.getDate() + 30);
            res.cookie('token', Login.token, { expires: time });
            res.cookie('username', req.query.username);
            await userModel.findByIdAndUpdate(req.query.username, Login).exec();
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
        const Login = await userModel.findByIdAndRemove(req.params.id).exec();
        res.status(201).json({ Login });
    } catch (error) { res.status(500).json({ msg: error }) }
}
module.exports = app;