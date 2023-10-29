"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password with at least 6 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
exports.User = mongoose.model('User', UserSchema, 'users');
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield exports.User.findById(id);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.json(user);
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredFields = ['username', 'password', 'email'];
    const { body } = req;
    const invalid = requiredFields.some(field => !body[field]);
    console.log(body);
    if (invalid) {
        return res.status(400).send(new Error('Please provide username, password and email'));
    }
    const newUser = new exports.User(body);
    yield newUser.save();
    res.status(201).json({ id: newUser._id });
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        yield exports.User.findOneAndUpdate({ _id: id }, body, { new: true });
    }
    catch (err) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(204).send();
});
exports.default = {
    getUser,
    createUser,
    updateUser
};
//# sourceMappingURL=users.js.map