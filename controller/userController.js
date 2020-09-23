const express = require('express')
// var router = express.Router()
var app = express()
const mongoose = require('mongoose');

const User = mongoose.model('User')

app.get('/', function (req, res) {
    if (req.session.username && req.session.email) {
        res.redirect('/home')
        res.status('200')
    } else {
        res.render('userLogin')
    }
})
app.get('/home', function (req, res) {
    if (req.session.email) {
        res.render('Home', {
            username: req.session.username,
            email: req.session.email
        })
    } else {
        res.redirect('/');
        console.log('Mohon login terlebih dahulu!')
    }
})

app.get('/register', function (req, res) {
    res.render('userRegister')
})

app.post('/userRegister', function (req, res) {
    if (req.body._id == '') {
        tambahUser(req, res)
    } else {
        res.redirect('/')
        console.log('Error registering user')
        // console.log('Error registering user');
    }
})
app.post('/userLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (!err) {
            if (user) {
                // console.log(user)
                // console.log(user.username)
                req.session.username = user.username
                req.session.email = req.body.email
                res.redirect('/home')
                console.log('Berhasil Login. Selamat Datang ' + req.body.email)
                // console.log('Berhasil Login')
            } else {
                console.log('User belum terdaftar')
                res.status('500').send('User belum terdaftar')
            }
        } else {
            console.log('Terdapat kesalahan pada data')
            res.status('500').send('Kesalahan pada Data')
        }
    })
})

function tambahUser(req, res) {
    var user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.password = req.body.password
    user.save((err) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log('Error registering user')
            // console.log('Error registering user');
        }
    })
}

app.get('/logout', function (req, res) {
    req.session = null
    res.redirect('/')
})

module.exports = app