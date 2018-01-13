const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');

const User = mongoose.model('users');

// Get user list
router.get('/', (req, res) => {
    User.find({})
        .sort({ created: 'asc' }) // sort by ascending creation date order
        .then(users => {
            if (users.length === 0) {
                return res.status(404).send({ message: 'No users were found' });
            }
            return res.status(200).send(users);
        })
        .catch(err => {
            if (err.message) {
                return res.status(200).send({ error: err.message });
            }
            return res.status(200).send(err);
        });
});

// Get single user
router.get('/:id', (req, res) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(200).send({ message: 'Invalid ID!' });
    }
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            return res.status(200).send(user);
        })
        .catch(err => {
            if (err.message) {
                return res.status(200).send({ error: err.message });
            }
            return res.status(200).send(err);
        });
});

// Post user
router.post('/', (req, res) => {
    const newUser = {
        email: req.body.email,
        forename: req.body.forename,
        surname: req.body.surname,
    }
    new User(newUser)
        .save()
        .then(user => {
            return res.status(201).send(user);
        })
        .catch(err => {
            if (err.message) {
                return res.status(200).send({ error: err.message });
            }
            return res.status(200).send(err);
        });
});

// Update user
router.put('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            // set the new values
            user.email = req.body.email;
            user.forename = req.body.forename;
            user.surname = req.body.surname;

            user.save()
                .then(user => {
                    return res.status(200).send(user);
                })
                .catch(err => {
                    if (err.message) {
                        return res.status(200).send({ error: err.message });
                    }
                    return res.status(200).send(err);
                });
        })
});

// Delete user
router.delete('/:id', (req, res) => {
    User.remove({ _id: req.params.id })
        .then(() => res.status(204).send())
        .catch(err => {
            if (err.message) {
                return res.status(200).send({ error: err.message });
            }
            return res.status(200).send(err);
        });
});

module.exports = router;