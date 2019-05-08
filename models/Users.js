const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const find_or_create = require('mongoose-find-or-create');

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String
});

userSchema.plugin(find_or_create);
module.exports = mongoose.model("users", userSchema);