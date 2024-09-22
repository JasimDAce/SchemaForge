const mongoose = require('mongoose');

const url = "mongodb+srv://jasimAli:jasim@cluster0.6law0x4.mongodb.net/mydb2?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
.then((result) => {
    console.log("database connected")
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;