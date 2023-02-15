import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
//COMMANDS TO RUN - IF YOU ALREADY SET UP
//1. cd backend
//5. nodemon index

//COMMANDS TO RUN - FIRST TIME
//1. cd backend
//2. npm init -y
//3. npm install express mysql2 sequelize cors
//4. npm install -g nodemon
//5. nodemon index --> to ensure it runs properly

//Connect to DB -> ./config/Database.js

//Create DB objects -> ./models

//Controllers -> your get set functions to retrieve from databases

//Routers -> ./routes
const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
//Local host 5000 for backend
//Local host 3000 for frontend
app.listen(5000, ()=> console.log('Server up and running...'));