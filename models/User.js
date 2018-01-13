const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');

// Create User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        trim: true,
    },
    forename: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
    },
    surname: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
    },
    created: {
        type: Date,
        Default: Date.now,
    }
}, {
        timestamps: {
            createdAt: 'created',
            updatedAt: false,
        }
    });

// Normalize output to hide MongoDB version and rename _id to id
UserSchema.plugin(toJson);

mongoose.model('users', UserSchema);
