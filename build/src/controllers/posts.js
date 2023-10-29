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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("./users");
const { Schema } = mongoose_1.default;
const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    body: {
        type: String,
        required: [true, 'Please provide a body']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Post = mongoose_1.default.model('Post', PostSchema, 'posts');
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post.find();
    res.status(200).json(posts);
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield Post.findById(id);
    if (!post) {
        return res.status(404).send({ message: 'Post not found' });
    }
    res.json(post);
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredFields = ['title', 'body', 'userId'];
    const { body } = req;
    const invalid = requiredFields.some(field => !body[field]);
    if (invalid)
        return res.status(400).json({ msg: 'Please provide title and body' });
    const { userId } = body;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId))
        return res.status(400).json({ msg: 'Please provide a valid userId' });
    try {
        yield users_1.User.findById(userId);
    }
    catch (err) {
        return res.status(400).json({ msg: 'Please provide a valid userId' });
    }
    const newPost = new Post(body);
    yield newPost.save();
    res.status(201).json({ id: newPost._id });
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        yield Post.findOneAndUpdate({ _id: id }, body, { new: true });
    }
    catch (err) {
        return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(204).send();
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Post.deleteOne({ _id: id });
    }
    catch (err) {
        return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).send({ message: 'Post deleted' });
});
exports.default = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
//# sourceMappingURL=posts.js.map