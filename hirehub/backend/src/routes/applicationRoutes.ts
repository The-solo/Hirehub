import { Hono } from 'hono'
import { getPrisma } from '../prismaFun';
import { employeeOnly } from '../middleware/middlewares';

const applicationRouter = new Hono<{
    Bindings : {
       DATABASE_URL : string; //specifying the type of the env variable.
    },
    Variables : {
        userId : number,
    }
}>() 



export default applicationRouter;