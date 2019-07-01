const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    subscription: {
        type: String,
        required: true
    }
});

const SubModel = mongoose.model("Sub", SubSchema);
module.exports = SubModel;