import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '', required: true},
    rating: { type: Number, min: 0, max: 5, default: 0 },
    imageUrl: { type: String, default: '' },
    isFavorite: { type: Boolean, default: false },
    estimatedPrice: {
        minPrice: { type: Number, min: 1, max: 10000, default: 1, required: true },
        maxPrice: { type: Number, min: 1, max: 20000, default: 2, required: true },
    },
    comments: [{
        author: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }]
})

export const Product = mongoose.model('Product', productSchema);