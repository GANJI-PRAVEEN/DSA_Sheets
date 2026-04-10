
import express from 'express';
import cors from 'cors';
import dsaSheetsRouter from './routes/dsaSheetsRouter.js';

const app = express();

const allowedOrigins = [
  'https://dsasheets2.vercel.app',
  ...(process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : []),
];

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (no Origin header) and approved browser origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Main API routes
app.use('/api/dsa-sheets', dsaSheetsRouter);

// 404 handler - return JSON instead of HTML
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app
