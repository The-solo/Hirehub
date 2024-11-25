import { Hono } from 'hono'
import { getPrisma } from '../prismaFun';
import { auth, employerOnly } from '../middleware/middlewares';
import { createJobPostInput, updateJobPostInput } from '../validation/validationSchemas';

const jobPostRouter = new Hono<{
    Bindings : {
       DATABASE_URL : string; //specifying the type of the env variable.
    },
    Variables : {
        userId : number;
        employerId : number;
        jobId : number;
    }
}>()


//route to get the all the application submited to the specific post.
jobPostRouter.get("/applications", auth, employerOnly, async(c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const employerID = c.get('userId');

        const jobPostings = await prisma.jobPosting.findMany({
            where: { 
                id : employerID
            },
            include: {
              applications: {
                include: {
                  employee: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      education: true,
                    },
                  },
                },
              },
            },
          });
        
        //Structure Response
        const response = jobPostings.map((job) => ({
            jobPosting: {
              id: job.id,
              title: job.title,
              description: job.description,
              jobType: job.jobType,
              location: job.location,
              company: job.company,
            },
            applications: job.applications.map((app) => ({
              id: app.id,
              resumeUrl: app.resumeUrl,
              createdAt: app.createdAt,
              employee: app.employee,
            })),
            totalApplications: job.applications.length,
        }));

        return c.json({
            jobPostings: response
        }, 200);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error fetching the applications.", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});



//route for creating the job-posts
jobPostRouter.post("/new",auth, employerOnly, async (c)=> {
    const prisma = getPrisma(c.env.DATABASE_URL);

    try { 
        const body = await c.req.json();
        const isValid = createJobPostInput.safeParse(body);

        if(!isValid.success) {
            return c.text("Invalid inputs", 400);
        }

        const employerID = c.get("userId");

        const duplicatePost = await prisma.jobPosting.findFirst({
            where: {
                title: body.title,
                company: body.company,
                employerId: body.employerId
            }
        });
        
        if(duplicatePost) {
            return c.text("The Job already exist.")
        }

        const newJob = await prisma.jobPosting.create({
            data : {
                title: body.title,
                description: body.description,
                jobType: body.jobType,
                location: body.location,
                company: body.company,
                employerId : employerID,
            }
        });

        const {employerId, ...responseData} = newJob;   

        return c.json({
            message : "The JobPost has been successfully created",
            responseData,
        }, 201);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while creating post", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});


// Route for updating a specific job-post
jobPostRouter.put("/update/:id", auth, employerOnly, async (c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);
    const jobId = c.req.param("id");
    const employerId = c.get("userId");

    try { 
        const body = await c.req.json();

        const isValid = updateJobPostInput.safeParse(body);
        if (!isValid.success) {
            return c.text("Invalid Inputs", 400);
        }

        // Validate that the jobId is a number
        if (isNaN(Number(jobId))) {
            return c.json({
                error: "Invalid job posting ID."
            }, 400);
        }

        const existingPost = await prisma.jobPosting.findUnique({
            where: {
                id: Number(jobId),
            }
        });

        if (!existingPost || existingPost.employerId !== employerId) {
            return c.text("The Job post doesn't exist or you are unauthorized.", 404);
        }

        // Update the job posting
        const updatedPost = await prisma.jobPosting.update({
            where: {
                id: Number(jobId),
            }, 
            data: {
                title: body.title,
                description: body.description,
                company: body.company,
                location: body.location,
                jobType: body.jobType,
            }
        });

        const {employerId: _, ...responseData} = updatedPost; // Exclude employerId
        
        return c.json({
            message: "The post has been successfully updated",
            responseData
        }, 200);

    } catch(err) {
        console.error('Error updating job posting:', err);
        return c.text("Internal server error", 500);
    } finally {
        await prisma.$disconnect();
    }
});



//Route for deleting the job-posts.
jobPostRouter.delete("/delete/:id",auth, employerOnly, async (c)=> {
    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
        const jobId = c.req.param('id');
        const employerId = c.get("userId");

        if (isNaN(Number(jobId))) {
            return c.json({ 
                error: "Invalid job posting ID."
            }, 400);
        }

        const isExist = await prisma.jobPosting.findUnique({
            where  : {
                id : Number(jobId),
            },
        });

        if(!isExist || isExist.employerId !== employerId){
            return c.text("The Job-post you are trying to delete doesn't exist!", 404);
        }

        await prisma.jobPosting.delete({
            where: {
                id: Number(jobId),
            },
        });
        
        return c.json({
            message : "Job-post deleted successfully."
        }, 200);  

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while deleting the post.", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});

export default jobPostRouter;