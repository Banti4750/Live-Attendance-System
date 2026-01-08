import z from 'zod';


export const addClassValidation = z.object({
    className:z.string()
})

export const addStudentInClassValidation = z.object({
    studentId:z.string()
})

