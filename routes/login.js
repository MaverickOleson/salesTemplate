const express = require("express")
const app = express();

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        console.log(`Salt ${salt}`);

        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(`hashedPassword ${hashedPassword}`);

        const user = { name: req.body.name, password: hashedPassword, email: req.body.email }
        users.push(user)

        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = user.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send()
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch (error) {
        res.status(500).send()
    }
})

// Router.post('/logout', (req, res, next) => {
//     req.logout();
//     res.redirect('/adminLogin');
// })

module.exports = app;