import { Hono } from 'hono'
import { getPrisma } from '../prismaFun';
import { sign } from 'hono/jwt';
import { auth } from '../middleware/middlewares';
import { signinInput, signupInput, editProfileInput } from "../validation/validationSchemas";
import bcrypt from "bcryptjs"

const userRouter = new Hono<{
    Bindings : {
       DATABASE_URL : string; //specifying the type of the env variable.
       JWT_SECRET : string;
       PEPPER : string;
    },
    Variables : {
        userId : number,
    }
}>()

//signup route
userRouter.post('/signup', async (c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);

    try{
        const body = await c.req.json();

        const isValid = signupInput.safeParse(body);
        if(!isValid.success) {
          return c.text("Invalid Inputs", 400);
        }

        const isExist = await prisma.user.findUnique({
            where : {
              email : body.email,
            }
        });

        if(isExist) {
            return c.text("user already exist, please try again.", );
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(
            body.password + c.env.PEPPER,
            12
        );
        body.password = hashedPassword;

        await prisma.user.create({
            data : {
                email : body.email,
                password : body.password,
                role : body.role,
                name : body.name
            }
        });

        return c.text("user created successfully!");

    } catch(err) {
        console.error('Error:', err);
        c.status(411)
        return c.text("Invalid");
        
    } finally {
        await prisma.$disconnect();
    }
});

//signin route
userRouter.post('/signin', async(c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);

    try{
        const body = await c.req.json();

        const isValid = signinInput.safeParse(body);
        if(!isValid.success) {
          return c.text("Invalid Inputs", 400);
        }

        const user = await prisma.user.findUnique({
            where : {
              email : body.email,
            },
        });

        if(!user) {
            c.status(403);
            return c.text("Invalid credentials!", 401);
        }

        // Verify the password 
        const isPasswordValid = await bcrypt.compare(
            body.password + c.env.PEPPER,
            user.password
        );

        if (!isPasswordValid) {
            return c.text("Invalid password!", 403);
        }
        
        //generating the token...
        const token = await sign({id : user.id, role : user.role},
            c.env.JWT_SECRET
        )

      return c.json({token}, 200);

    } catch(err) {
        console.error('Error:', err);
        c.status(500)
        return c.text("Something went wrong");

    } finally {
        await prisma.$disconnect();
    }
});
  
//UserProfile route.
userRouter.get('/profile', auth, async (c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
      const userId = c.get('userId');

      const profile = await prisma.user.findUnique({
        where: {
            id: userId,

        }, select : {
            name : true,
            email : true,
            role : true,
            description : true,
            education : true,
        }
      });
  
      if (!profile) {
        return c.json({ 
            error: 'User not found' 
        }, 404);
      }

      return c.json({profile}, 200);

    } catch (error) {
        console.error('Error while fetching profile:', error);
        return c.json({ 
        error: 'Internal Server Error' 
    }, 500);

    } finally {
        await prisma.$disconnect();
    }
});


  //route to update the profile..
userRouter.put("/profile/update", auth, async(c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const body = await c.req.json();
        const userID = c.get('userId')

        const isValid =  editProfileInput.safeParse(body);
        if(!isValid.success) {
            return c.text("Invalid Inputs", 400);
        }

    //preventing the accidental or malecious updates of sensetive data.
        const { password, ...otherFields } = body;
        const updateData = { ...otherFields };

        //checking if the password exists.
        if (password && password !== "") {
            const hashedPassword = await bcrypt.hash(
                body.password + c.env.PEPPER, 12);

            updateData.password = hashedPassword;
        }

        await prisma.user.update({
            where: { id: userID},
            data: updateData
        });

        return c.json({
            message : "Profile updated successfully",
        }, 200);

    } catch (error) {
        console.error('Error updating profile:', error);
        return c.json({ 
          error: 'Error while updating profile, please try again!'
       }, 500);
  
      } finally {
        await prisma.$disconnect();
      }
});

//Route to delete the profile.
userRouter.delete('/profile', auth, async (c) => {

    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
      const userId = c.get('userId');

      // Delete the user
      const profile = await prisma.user.findUnique({
        where: {
            id: userId,

        }, include : {
            jobs : true,
            applications : true,
        }
      });

      if(!profile) {
        c.text("user not found", 404);

      } else {
        await prisma.user.delete({
            where : {
                id : userId,
            }
        });

        return c.json({ 
          message: 'User profile deleted successfully'
       }, 200);

      }
     
    } catch (error) {
      console.error('Error deleting profile:', error);
      return c.json({ 
        error: 'Internal Server Error'
     }, 500);

    } finally {
      await prisma.$disconnect();
    }
});
  
export default userRouter;
