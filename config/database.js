if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: "mongodb://mihalis:mihalis@ds251807.mlab.com:51807/users-prod"
    }
} else if (process.env.NODE_ENV === 'test') {
    module.exports = {
        mongoURI: "mongodb://localhost/test"
    }
} else {
    module.exports = {
        mongoURI: "mongodb://localhost/dev"
    }
}