import mongoose, { Schema } from 'mongoose';

// {
//   _id: ObjectId,
//   classId: ObjectId,
//   studentId: ObjectId,
//   status: "present" | "absent"
// }

const AttendanceSchema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
}, { timestamps: true });

// Prevent duplicate attendance for same student, class & date
AttendanceSchema.index(
  { classId: 1, studentId: 1, date: 1 },
  { unique: true }
);
export default mongoose.model('Attendance', AttendanceSchema);