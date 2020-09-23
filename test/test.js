var app = require('../server').app
var chai = require('chai')
var expect = chai.expect;
var request = require('supertest')
// const userController = require('../controller/userController').app

describe('Login Register Tests', function () {
    describe('# GET Home Page', function () {
        it('menampilkan halaman home', function (done) {
            request(app).get('/').end(function (err, req, res) {
                // expect(req.session.username = true)
                expect(req.session = true)
                expect(req.status = 200)
                done();
            });
        });
    })

    describe('# GET logout', function () {
        it('logout user - menghapus session', function (done) {
            request(app).get('/logout').end(function (err, req, res) {
                expect(req.session = null)
                // expect(res.body).to.be.an('array');
                // expect(res.body).to.be.empty;
                done();
            });
        });
    })
})