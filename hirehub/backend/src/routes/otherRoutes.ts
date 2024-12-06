import { Hono } from 'hono'
import { getPrisma } from '../prismaFun';
import { auth, } from '../middleware/middlewares';

const otherRoutes = new Hono<{
    Bindings : {
       DATABASE_URL : string; //specifying the type of the env variable.
    },
    Variables : {
        userId : number;
    }
}>()


//feed route which has the job_postings mostly.
otherRoutes.get("/feed", auth, async(c)=>{
    const prisma = getPrisma(c.env.DATABASE_URL);

    try{
        const jobPostings = await prisma.jobPosting.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                jobType: true,
                location: true,
                company: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        
        return c.json({
            jobPostings
        }, 200);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Error while fetching the feed.", 500);
        
    } finally {
        await prisma.$disconnect();
    }
});



//search functionality route --optional
otherRoutes.get("/search/", auth, async (c) =>{
    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
        const searchQuery = c.req.query("name");

        if (!searchQuery) {
            return c.json({
                error: 'Name query is required.'
            }, 400);
        }

        const profiles = await prisma.user.findMany({
            where: {
                name: {
                    contains: searchQuery,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                description: true,
            },
        });

        return c.json({ 
            profiles
        }, 200);

    } catch (err) {
        console.error('Error:', err);
        c.status(500);
        return c.text("Error while searching profiles", 500);

    } finally {
        await prisma.$disconnect();
    }

});


export default otherRoutes;