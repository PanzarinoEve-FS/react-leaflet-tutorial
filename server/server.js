import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5174' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/items', itemRoutes);

app.use(notFound);
app.use(errorHandler);

try {
  await connectDB();

  const server = app.listen(PORT);

  // Register the error handler before announcing success: Node can emit
  // 'listening' and only then surface EADDRINUSE, which would otherwise
  // print a "listening" line for a server that never actually bound.
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Set PORT in server/.env to a free port.`);
    } else {
      console.error(`Server error: ${err.message}`);
    }
    process.exit(1);
  });

  server.on('listening', () => {
    setImmediate(() => {
      const addr = server.address();
      if (addr) console.log(`Server listening on http://localhost:${PORT}`);
    });
  });
} catch (err) {
  console.error(`Failed to start: ${err.message}`);
  process.exit(1);
}
