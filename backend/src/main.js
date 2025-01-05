import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { responseTimeMiddleware } from './middlewares/responseTime.js';
import { apiKeyMiddleware } from './middlewares/bearer.js';
import Login from './routes/auth/login.js';
import SignUp from './routes/auth/signup.js';
import getUser from './routes/account/get.js';
import cookieParser from 'cookie-parser';
import CreateInvoice from './routes/invoices/create.js';
import getInvoices from './routes/invoices/get.js';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
};


app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(responseTimeMiddleware);
app.use(cookieParser())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Túl sok kérés érkezett erről az IP-címről, próbálkozz később!',
});

app.use(limiter);

app.get('/ping', apiKeyMiddleware, (req, res) => {
  const responseTime = Date.now() - req.startTime;
  res.status(200).json({ message: 'Pong!', responseTime: `${responseTime} ms` });
});

app.use('/auth', apiKeyMiddleware, Login)
app.use('/auth', apiKeyMiddleware, SignUp)

app.use('/user', apiKeyMiddleware, getUser)

app.use('/invoice', apiKeyMiddleware, CreateInvoice)
app.use('/invoice', apiKeyMiddleware, getInvoices)

app.listen(PORT, () => {
  console.log(`Szerver fut itt: http://localhost:${PORT}`);
});
