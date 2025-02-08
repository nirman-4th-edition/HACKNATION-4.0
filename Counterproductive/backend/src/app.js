import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(cookieParser());





//routes
import userRouter from './routes/user.routes.js';
import foodRouter from './routes/food.routes.js';
import paymentRouter from './routes/payment.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import reviewRouter from './routes/review.routes.js';
import notificationRouter from './routes/notification.routes.js';
import impactRouter from './routes/impact.routes.js';
import charityRouter from './routes/charity.routes.js';
import categoryRouter from './routes/category.routes.js';
import auditLogRouter from './routes/auditLog.routes.js'; 

//routes declaration
app.use('api/v1/users',userRouter);
app.use('api/v1/foods',foodRouter);
app.use('api/v1/payment',paymentRouter);
app.use('api/v1/transaction',transactionRouter);
app.use('api/v1/subscription',subscriptionRouter);
app.use('api/v1/review-rating',reviewRouter);
app.use('api/v1/notification',notificationRouter);
app.use('api/v1/impact',impactRouter);
app.use('api/v1/charity',charityRouter);
app.use('api/v1/category',categoryRouter);
app.use('api/v1/logs',auditLogRouter);

export { app }