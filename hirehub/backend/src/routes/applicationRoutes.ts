import { Hono } from 'hono'
import { getPrisma } from '../prismaFun';
import { auth, employeeOnly } from '../middleware/middlewares';
import { createApplicationSchema, updateApplicationSchema } from '../validation/validationSchemas';

const applicationRouter = new Hono<{
    Bindings : {
       DATABASE_URL : string; //specifying the type of the env variable.
    },
    Variables : {
        userId : number,
    }
}>() 


applicationRouter.post("/new", auth, employeeOnly, async (c)=> {
    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
        const body = await c.req.json();

        const isValid = createApplicationSchema.safeParse(body);
        const employeeID = c.get('userId');

        const jobPosting = await prisma.jobPosting.findUnique({
            where: {
                id: body.jobPostingId
            },
          });

          if (!jobPosting) {
            return c.json({
                error: 'Job posting not found.'
            }, 404);
          }

          const application = await prisma.application.create({
            data : {
                jobPostingId : body.jobPostingId,
                employeeId : employeeID,
                resumeUrl : body.resumeUrl,
            },

          });
          return c.json({
            message: 'Application submitted successfully.',
            application
        }, 201);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while creating application", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});



//route to update the application 
applicationRouter.post("/update/:id", auth, employeeOnly, async (c)=> {
    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
        const body = await c.req.json();
        const applicationId = parseInt(c.req.param('id'));
        const employeeId = c.get('userId');

        const isValid = updateApplicationSchema.safeParse(body);

        if(!isValid.success) {
            return c.json({
                message : "Invalid Inputs."
            }, 403)
        }

        const application = await prisma.application.findUnique({
          where: {
            id: applicationId 
         },
        });

        if (!application) {
          return c.json({
            error: 'Application not found.'
         }, 404);
        }
    
        if (application.employeeId !== employeeId) {
          return c.json({
            error: 'Unauthorized to update this application.'
         },403);
        }
    
        // Update Application
        const updatedApplication = await prisma.application.update({
          where: {
            id: applicationId
         }, data : body,
        });
    
        return c.json({
            message: 'Application updated successfully.',
            application: updatedApplication
        }, 200);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while updating application", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});




//route to delete the application
applicationRouter.post("/delete/:id", auth, employeeOnly, async (c)=> {
    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
        const applicationId = parseInt(c.req.param('id'));
        const employeeId = c.get('userId');

        const application = await prisma.application.findUnique({
            where: {
                id: applicationId
            },
        });


        if (!application) {
            return c.json({
                error: 'Application not found.'
            }, 404);
        }

        if (application.employeeId !== employeeId) {
            return c.json({
                error: 'Unauthorized to delete this application.'
            }, 403);
        }

        await prisma.application.delete({
            where: {
                id: applicationId
            },
        });

        return c.json({
            message: 'Application deleted successfully.'
        }, 200);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while deleting application", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});


export default applicationRouter;