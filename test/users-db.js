"use strict";

const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');

describe('Database Tests', () => {

    it('should create a new user', (done) => {
        let newUser = {
            email: 'test@test.com',
            forename: 'test forename',
            surname: 'test surname'
        }
        new User(newUser)
            .save()
            .then(user => {
                user.email.should.be.eql('test@test.com');
                user.forename.should.be.eql('test forename');
                done();
            });
    });

    it('should retrieve the previously created user from the database', (done) => {
        User.findOne({ forename: 'test forename' })
            .then(user => {
                user.email.should.be.eql('test@test.com');
                user.forename.should.be.eql('test forename');
                done();
            });
    });

    it('should return error when trying to save a user with wrong input data', (done) => {
        let wrongUser = {
            forename: 'test forename',
            surame: 'test surname'
        };
        new User(wrongUser)
            .save()
            .catch(err => {
                done();
            })
    });

    it('Should update the user', (done) => {
        User.findOne({
            forename: 'test forename'
        })
            .then(user => {
                // set the new values
                user.email = 'test1@test.com';
                user.forename = 'new forename';
                user.surname = 'new surname';
                user.save()
                    .then(user => {
                        user.email.should.be.eql('test1@test.com');
                        user.forename.should.be.eql('new forename');
                        user.surname.should.be.eql('new surname');
                        done();
                    });
            });
    });

    it('should delete the previously created user', (done) => {
        User.remove({ forename: 'new forename' })
            .then(() => done());
    });
});