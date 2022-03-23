const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./connectDB');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const userModel = require('./models/users');
require('dotenv').config();

app.set('layout', 'layout/main.ejs');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/styles'));
app.use(expressLayouts);
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoutes);
app.use('/js', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/styles'));
app.use(['/yourInfo', '/logout'], async (req, res, next) => {
	if (req.cookies.token && req.cookies.username) {
		const Login = await userModel.findOne({ _id: req.cookies.username }).exec();
		if (req.cookies.token == Login.token) return next();
		return res.redirect('/login');
	}
	res.redirect('/login');
})
app.use(['/login', '/register', '/invalidLogin'], async (req, res, next) => {
	if (req.cookies.token && req.cookies.username) {
		const Login = await userModel.findOne({ _id: req.cookies.username }).exec();
		if (req.cookies.token == Login.token) return res.redirect('/logout');
		return next();
	}
	next();
})

app.get('/', (req, res) => {
	res.render('pages/home', {
	});
});
app.get('/yourInfo', (req, res) => {
	res.render('pages/yourInfo', {
	});
});
app.get('/login', (req, res) => {
	res.render('pages/login', {
	});
});
app.get('/logout', (req, res) => {
	res.render('pages/logout', {
	});
});
app.get('/invalidLogin', (req, res) => {
	res.render('pages/invalidLogin', {
	});
});
app.get('/register', (req, res) => {
	res.render('pages/register', {
	});
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(5000, console.log(`server is listening on port 5000`));
	} catch (error) { console.error(error) }
}
start();