const restful = require('node-restful'),
    mongoose = restful.mongoose;
let deepPopulate = require('mongoose-deep-populate')(mongoose);
let strings = require('./strings');
let _ = require("lodash");
let l = require("./loader");
// let myVar = setInterval(function () {
//     if (_.size(l) > 0) {
//         clearInterval(myVar);
//         return;
//     }
//     l = require("./loader");
// }, 1000);


let schema = mongoose.Schema({
    name: {type: String, trim: true, required: true},
    message: {type: String, trim: true},

    active: {type: Number, default: 1}
}, {
    // http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
});

let model = restful.model('Contact', schema);
model.methods(['get', 'post', 'put', 'delete']);
schema.plugin(deepPopulate, {});

model.register(strings.app, '/api/contact');
module.exports = model;
