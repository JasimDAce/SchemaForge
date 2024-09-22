const {Schema, model} = require('../connections');

const mySchema = new Schema({
    email : {type: String , unique: true},
    password : {type: String, required: true},
    createdAt : {type : Date, default: Date.now}
})

module.exports = model('user1',mySchema);