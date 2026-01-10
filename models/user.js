const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//das kommt immer dazwischen wenn ein neuer user gesaved wird
userSchema.pre('save', async function () {
    console.log("Vorher:", this.password);
    this.password = await bcrypt.hash(this.password, 10); // hashen

    console.log("Nachher:", this.password);

});
const USER = mongoose.model('User', userSchema);
module.exports = USER;

