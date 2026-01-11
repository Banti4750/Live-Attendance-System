import dotenv from "dotenv";
import { addClassValidation, addStudentInClassValidation } from "../validations/class.validation.js";
import classModel from "../models/class.model.js";
import mongoose from "mongoose";
dotenv.config();



export const addClass =async (req , res) =>{
    try {
        const id = req.user.userId;
        const role = req.user.role;
        if(role !== 'teacher'){
            return res.status(403).json({
                "success": false,
                "error": "Forbidden, only teachers can add classes"
            });
        }
        const safeparse=addClassValidation.safeParse(req.body);
        if(!safeparse.success){
                    return res.status(400).json({"success": false,"error":"Invalid request schema",});
                }
        console.log(safeparse.data);

        const addClass = await classModel.create({
             ...safeparse.data,
           teacherId: id

        })
        res.status(201).json({"success": true, data: addClass
        });
    } catch (error) {
        console.error("Error in addClass:", error);
        res.status(500).json({"success": false,"error":"Internal server error",});
    }
}

//add student
export const addStudent = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    const classId = req.params.id;

    // 1️⃣ Role check
    if (role !== "teacher") {
      return res.status(403).json({
        success: false,
        error: "Forbidden, only teachers can add students"
      });
    }

    // 2️⃣ Validate request body
    const parsed = addStudentInClassValidation.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid request schema"
      });
    }

    const { studentId } = parsed.data;

    // 3️⃣ Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(classId) ||
      !mongoose.Types.ObjectId.isValid(studentId)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid classId or studentId"
      });
    }

    // 4️⃣ Find class & verify ownership
    const classData = await classModel.findOne({
      _id: classId,
      teacherId
    });

    if (!classData) {
      return res.status(404).json({
        success: false,
        error: "Class not found or access denied"
      });
    }

    // 5️⃣ Prevent duplicate student
    if (classData.studentIds.includes(studentId)) {
      return res.status(409).json({
        success: false,
        error: "Student already added to class"
      });
    }

    // 6️⃣ Add student
    classData.studentIds.push(studentId);
    await classData.save();

    // 7️⃣ Success response
    return res.status(200).json({
      success: true,
      data: classData
    });

  } catch (error) {
    console.error("Add student error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};


export const getClassById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    const classId = req.params.id;

    // 1️⃣ Validate classId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid classId"
      });
    }

    // 2️⃣ Fetch class with populated students
    const classData = await classModel.findById(classId)
      .populate("studentIds", "name email")
      .lean();

    if (!classData) {
      return res.status(404).json({
        success: false,
        error: "Class not found"
      });
    }

    // 3️⃣ Authorization check
    const isTeacherOwner =
      role === "teacher" && classData.teacherId.toString() === userId;

    const isEnrolledStudent =
      role === "student" &&
      classData.studentIds.some(
        (student) => student._id.toString() === userId
      );

    if (!isTeacherOwner && !isEnrolledStudent) {
      return res.status(403).json({
        success: false,
        error: "Access denied"
      });
    }

    // 4️⃣ Format response
    return res.status(200).json({
      success: true,
      data: {
        _id: classData._id,
        className: classData.className,
        teacherId: classData.teacherId,
        students: classData.studentIds
      }
    });

  } catch (error) {
    console.error("Get class error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const role = req.user.role;

    // 1️⃣ Role check (Teacher only)
    if (role !== "teacher") {
      return res.status(403).json({
        success: false,
        error: "Forbidden, only teachers can access students list"
      });
    }

    // 2️⃣ Fetch students
    const students = await User.find(
      { role: "student" },
      { name: 1, email: 1 }
    ).lean();

    // 3️⃣ Success response
    return res.status(200).json({
      success: true,
      data: students
    });

  } catch (error) {
    console.error("Get students error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};