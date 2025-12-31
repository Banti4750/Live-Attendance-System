import mongoose, { Schema } from 'mongoose';


// {
//   _id: ObjectId,
//   name: String,
//   email: String,
//   password: String, // hashed with bcrypt
//   role: "teacher" | "student"
// }

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ['teacher', 'student'],
        required:true
    }
}, { timestamps: true });


export default mongoose.model('User', UserSchema);