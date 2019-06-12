const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String,
    nickname: {
        type: String,
        required: false,
        unique: true
    }
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model("users", userSchema);