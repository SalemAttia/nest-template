import * as mongoose from 'mongoose';
import { BookType } from '../../books/protocol/book.type';
const Schema = mongoose.Schema;

export const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  auther: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },

  type: {
    type: String,
    enum: [BookType.PRIVATE, BookType.PUBLICA],
  }
});