
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imageFile: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['avatar', 'product'], required: true },
}, { timestamps: true });

export const Image = mongoose.model('Image', imageSchema);