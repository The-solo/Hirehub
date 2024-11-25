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


applicationRouter.post("/create", auth, employeeOnly, async (c)=> {
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

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while deleting application", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});
export default applicationRouter;