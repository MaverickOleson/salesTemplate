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
		const Login = await userModel.findById(req.cookies.username).exec();
		if (!Login) return res.redirect('/login');
		if (req.cookies.token == Login.token) return next();
		return res.redirect('/login');
	}
	res.redirect('/login');
})
app.use(['/login', '/register', '/invalidLogin'], async (req, res, next) => {
	if (req.cookies.token && req.cookies.username) {
		const Login = await userModel.findById(req.cookies.username).exec();
		if (!Login) return next();
		if (req.cookies.token == Login.token) return res.redirect('/logout');
		return next();
	}
	next();
})

app.get('/', (req, res) => {
	res.render('pages/home');
});
app.get('/yourInfo', async (req, res) => {
	const Login = await userModel.findById(req.cookies.username).exec();
	res.render('pages/yourInfo', {
		name: Login._id,
		info: JSON.parse(Login.info)
	});
});
app.get('/contactUs', async (req, res) => {
	res.render('pages/contactUs');
});
app.get('/login', (req, res) => {
	res.render('pages/login', {
		alert: req.query.alert
	});
});
app.get('/logout', (req, res) => {
	res.render('pages/logout');
});
app.get('/register', (req, res) => {
	res.render('pages/register', {
		alert: req.query.alert
	});
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, console.log(`server is listening on port 2000`));
	} catch (error) { console.error(error) }
}
start();