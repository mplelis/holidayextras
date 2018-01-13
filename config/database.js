if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: "mongodb://mihalis:mihalis@ds251807.mlab.com:51807/users-prod"
    }
} else if (process.env.NODE_ENV === 'test') {
    module.exports = {
        mongoURI: "mongodb://192.168.99.100/test"
    }
} else {
    module.exports = {
        mongoURI: "mongodb://192.168.99.100/dev"
    }
}