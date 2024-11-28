import { Hono } from 'hono'
import userRouter from './routes/userRoutes';
import jobPostRouter from './routes/jobPostRoutes';
import applicationRouter from './routes/applicationRoutes';
import otherRoutes from './routes/otherRoutes';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono<{ 
    Bindings: { 
        DATABASE_URL: string 
    } }
>();


app.use("*", prettyJSON());
app.use('/*', cors());
app.route('/user/', userRouter);
app.route('/home/', otherRoutes);
app.route('/job-post/', jobPostRouter);
app.route('/application/', applicationRouter);

export default app;
