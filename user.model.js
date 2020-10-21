let restful = require('node-restful'),
    mongoose = restful.mongoose;
let deepPopulate = require('mongoose-deep-populate')(mongoose);
const strings = require('./strings');
const _ = require("lodash");
let l = require("./loader");

let schema = mongoose.Schema({
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true},
    mobile_number: {type: Number, trim: true},
    message: {type: String, trim: true},

    active: {type: Number, default: 1}
}, {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
});

let model = restful.model('User_Contact', schema);
model.methods(['get', 'post', 'put', 'delete']);
schema.plugin(deepPopulate, {});

model.register(strings.app, '/api/user');
module.exports = model;
