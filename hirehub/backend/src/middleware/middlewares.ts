import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';


export const auth = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return c.json({
            message : "Access denied!, no token provided."
        }, 401);
    }

    
    // Verify the token
    const payload = await verify(token, c.env.JWT_SECRET);
    
    if (typeof payload === 'object' && payload !== null && 'id' in payload && 'role' in payload) {
        c.set('userId', payload.id);
        c.set('userRole', payload.role);
        console.log('Authentication Successful:', payload);
        await next();
        
    } else {
        console.log('Authentication Failed: Invalid token payload.');
        return c.json({ 
            error: 'Unauthorized: Invalid token.'
        }, 401);
    }

  } catch (error) {
    console.error('Authentication error:', error);
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
};


export const employerOnly = async (c : Context, next : Next) => {
    const userRole = c.get('userRole');

    console.log(`employerOnly Middleware - User Role: ${userRole}`);

    if (userRole == "EMPLOYER") {
        await next();

    } else {
        return c.json({ 
            error: 'Unauthorized: Employers only.'
        }, 403);
    }
};


export const employeeOnly = async (c : Context, next : Next) => {
    const userRole = c.get('userRole');

    console.log(`employeeOnly Middleware - User Role: ${userRole}`);

    if (userRole == "EMPLOYEE") {
        await next();

    } else {
        return c.json({ 
            error: 'Unauthorized: Employee only.'
        }, 403);
    }
    
};