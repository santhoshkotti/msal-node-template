import express, { Request, Response, NextFunction ,Application} from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import bearerStrategy from './passport-config';

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
passport.use(bearerStrategy);
app.use(passport.initialize());

// Authentication middleware
const authMiddleware = passport.authenticate('oauth-bearer', { session: false });

// Public route
app.get('/api/public', (req: Request, res: Response) => {
  res.json({ message: 'This is a public route, no authentication required.' });
});

// Protected route
app.get('/api/data', authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: 'You have accessed a protected route!',
    user: req.user, // Token claims will be here
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
