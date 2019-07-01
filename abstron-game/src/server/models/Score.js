const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const ScoreModel = mongoose.model("Scores", ScoreSchema);
module.exports = ScoreModel;