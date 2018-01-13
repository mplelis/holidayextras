"use strict";

process.env.NODE_ENV = 'test';
process.env.PORT = '5000';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('User routes tests', () => {

    let userId;
    let dummyUserId = '5f593281ad76e600e4f19f79';

    describe('/POST user', () => {
        it('it should POST a user and return 201 status code', (done) => {
            let newUser = {
                email: 'testTest@test.com',
                forename: 'forename',
                surname: 'surname'
            }
            chai.request(app)
                .post('/users')
                .send(newUser)
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    userId = res.body.id;
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('testTest@test.com');
                    done();
                });
        });
    });

    it('it should POST a user with wrong data and return error message', (done) => {
        let newUser = {
            emal: 'testTesttest.com',
            forename: 'forename',
            srnme: 'surname'
        }
        chai.request(app)
            .post('/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('users validation failed: surname: can\'t be blank, email: can\'t be blank');
                done();
            });
    });

    describe('/GET a single user', () => {
        it('it should return "User not found" for a non existent user', (done) => {
            chai.request(app)
                .get(`/users/${dummyUserId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User not found');
                    done();
                });
        });

        it('it should return 200 status code with the user body', (done) => {
            chai.request(app)
                .get(`/users/${userId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('email').eql('testTest@test.com');
                    res.body.should.have.property('forename').eql('forename');
                    res.body.should.have.property('surname').eql('surname');
                    done();
                });
        });
    });

    describe('/PUT a user', () => {
        let updateUser = {
            email: 'testUpdate@test.com',
            forename: 'updated forename',
            surname: 'updated surname'
        }

        it('it should update a user', (done) => {
            chai.request(app)
                .put(`/users/${userId}`)
                .send(updateUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('testUpdate@test.com');
                    done();
                });
        });

        it('it should return "User not found" when trying to update not existing user', (done) => {
            chai.request(app)
                .put(`/users/${dummyUserId}`)
                .send(updateUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('User not found');
                    done();
                });
        });
    });

    describe('/DELETE a user', () => {
        it('it should delete an existing user', (done) => {
            chai.request(app)
                .delete(`/users/${userId}`)
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.empty;
                    done();
                });
        });
    });
});