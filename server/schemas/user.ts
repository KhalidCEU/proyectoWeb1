import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  imageURL: { type: String, default: '/static/unknown.jpg'}
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    }
  }
});

export const User = mongoose.model('User', userSchema);