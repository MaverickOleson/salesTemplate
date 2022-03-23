const express = require('express');
const app = express();
const accountModel = require('../models/users');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
require('dotenv').config();

app.post('/users', async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await accountModel.create(req.body);
        res.redirect('/login');
    } catch (error) {
        return res.status(400).send('name already exists');
    }
});
app.post('/users/:id', async (req, res, next) => {
    try {
        const Login = await accountModel.findOne({ _id: req.query.username }).exec();
        if (await bcrypt.compare(req.query.password, Login.password)) {
            await accountModel.findOneAndUpdate({ _id: req.query.username }, Login);
            res.redirect('/yourInfo');
        }
        else {
            return res.redirect('/invalidLogin');
        }
    } catch (error) {
        return res.status(400).send('name already exists');
    }
});
app.get('/users', async (req, res) => {
    try {
        const Login = await accountModel.findOne({ _id: req.query.username }).exec();
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
            return res.redirect('/invalidLogin');
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