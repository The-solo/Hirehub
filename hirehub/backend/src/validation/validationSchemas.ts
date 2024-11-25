import z from 'zod';

const Role = z.enum(["EMPLOYEE", "EMPLOYER"]);
const jobType = z.enum(["PART_TIME", "FULL_TIME", "INTERNSHIP"]);


// User related scheama below
export const signupInput = z.object({
    email : z.string().email(),
    name : z.string().min(3).max(255).optional().or(z.literal('')),
    password: z.string().min(6).max(255),
    role : Role,
    description : z.string().optional(),
    education : z.string().max(255).optional(),
});

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6).max(255)
});

export const editProfileInput = z.object({
    name : z.string().min(3).max(255).optional().or(z.literal('')),
    email: z.string().email().optional(),
    password: z.string().min(6).max(255).optional(),
    description : z.string().optional(),
    education : z.string().max(255).optional(), 
});
  


//jobPosting related schema below.
export const createJobPostInput = z.object({
    title : z.string().min(3).max(255),
    description : z.string(),
    jobType : jobType,
    location : z.string().max(255),
    company : z.string().min(3).max(255),    
});

export const updateJobPostInput = z.object({
    title : z.string().min(3).max(255).optional(),
    description : z.string().optional(),
    jobType : jobType.optional(),
    location : z.string().max(255).optional(),
    company : z.string().min(3).max(255).optional(), 
});



//Job-Applications related schemas.

export const createApplicationSchema = z.object({
    jobPostingId: z.number(),
    resumeUrl: z.string().url().optional(),
});
  
export const updateApplicationSchema = z.object({
    resumeUrl: z.string().url().optional(),
});




export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type editProfileInput = z.infer<typeof editProfileInput>

export type createJobPostInput = z.infer<typeof createJobPostInput>
export type updateJobPostInput = z.infer<typeof updateJobPostInput>


export type createApplicationSchema = z.infer<typeof createApplicationSchema>
export type updateApplicationSchema = z.infer<typeof updateApplicationSchema>