const restful = require('node-restful');
const mongoose = restful.mongoose;
const strings = require('./strings');
const _ = require('lodash');
const async = require("async");
const settings = require('./settings');
var User = require("./src/models/User.model");
var logger = require('tracer').console();

var initialize = {
    init: function () {
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};

        mongoose.connection.on('connected', function () {
            console.log('Mongoose connected....');


            User.findOne({username: 'admin'}, function (err, user) {
                if (err)
                    logger.error(err);
                if (user === undefined || user === null) {
                    User.create({
                        "first_name": "admin",
                        "last_name": "admin",
                        "username": "admin",
                        "password": "admin",
                        "active": 1,
                        "login_type": "admin"
                    }, function (err, user) {
                        if (err)
                            logger.error(err);
                        logger.error("admin user created...." + user);
                    });
                } else {
                    logger.log("admin user exists....");
                }
            });

        });

        mongoose.connection.on('connecting', function () {
            // console.log('connecting to MongoDB...');
        });

        mongoose.connection.on('error', function (error) {
            // console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        });
        mongoose.connection.on('connected', function () {
            console.log('MongoDB connected!');
        });
        mongoose.connection.once('open', function () {
            // console.log('MongoDB connection opened!');
        });
        mongoose.connection.on('reconnected', function () {
            // console.log('MongoDB reconnected!');
        });
        mongoose.connection.on('disconnected', function () {
            // console.log('MongoDB disconnected!');
            // No need for below line. It happens automatically.
            setTimeout(function () {
                mongoose.connect(settings.ConnectionString, {server: {auto_reconnect: true}});
            }, 1000 * 60);
        });


    },

};

module.exports = initialize;
