import mongoose, { Schema } from 'mongoose';

// {
//   _id: ObjectId,
//   className: String,
//   teacherId: ObjectId, // reference to User
//   studentIds: [ObjectId] // array of User references
// }

const ClassSchema = new Schema({
  className: {
    type: String,
    required: true
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  studentIds: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true });

export default mongoose.model('Class', ClassSchema);