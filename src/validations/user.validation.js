import z from 'zod';

export const signupValidation=z.object({
    name:z.string().min(1 , "Name is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6 , "Password must be at least 6 characters long"),
    role:z.enum(['teacher', 'student'], "Role must be either 'teacher' or 'student'")
});

export const loginValidation=z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6 , "Password must be at least 6 characters long"),
});

export const meValidation=z.object({
    // No fields required for 'me' endpoint, but keeping the structure for consistency
});