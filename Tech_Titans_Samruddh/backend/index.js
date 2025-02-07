import e from "express";
import 'dotenv/config' ;
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./Routes/AuthRouter.js"
import connectDB from "./DB/db.js";
const app = e();

const PORT = process.env.PORT || 8080;
connectDB()
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => res.send('Hello from Node.js Backend!'));
app.use('/auth',AuthRouter)

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
})