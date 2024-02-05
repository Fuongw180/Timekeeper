import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { EmployeeController } from "./app/controller/EmployeeController";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
// Tạo một endpoint để lấy dữ liệu từ cơ sở dữ liệu
createConnection()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/api/summary-hours/:userId", EmployeeController.getEmployeeDetails);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
