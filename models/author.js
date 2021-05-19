const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  username: { type: String, unique: true, required: [true, "Can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'] },
  email: { type: String, lowercase: true, unique: true, required: [true, "Can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'] },
  password: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Author', AuthorSchema);