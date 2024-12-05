import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true }
    },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export const Comment = mongoose.model('Comment', commentSchema);