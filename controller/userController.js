const express = require('express')
var router = express.Router()
const mongoose = require('mongoose');

const User = mongoose.model('User')

router.get('/', function (req, res) {
    res.render('userLogin')
})
router.get('/home', function (req, res) {
    res.render('Home')
})

router.get('/register', function (req, res) {
    res.render('userRegister')
})

router.post('/userRegister', function (req, res) {
    if (req.body._id == '') {
        tambahUser(req, res)
    } else {
        res.redirect('/')
        console.log('Error registering user');
    }
})
router.post('/userLogin', function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (!err) {
            if (user) {
                res.redirect('/home')
                console.log('Berhasil Login')
            } else {
                res.render('500').send('User belum terdaftar')
            }
        } else {
            res.render('500').send('Kesalahan pada Data')
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
            console.log('Error registering user');
        }
    })
}

module.exports = router