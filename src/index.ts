import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { EmployeeController } from "./app/controller/EmployeeController";
import passport from "passport";
import { isAuthenticated } from "./app/middlewares/auth.middleware";
import Passport from "./config/passportconfig";
import session from "express-session";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT;
// Tạo một endpoint để lấy dữ liệu từ cơ sở dữ liệu
createConnection()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error);
    });

// Express middleware
app.use(
    session({
        secret: process.env.SECRET_KEY ?? "",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get(
    "/api/summary-hours/id=:userId&month=:month&year=:year",
    [isAuthenticated],
    EmployeeController.getEmployeeDetails
);
app.post("/login", (req, res, next) => {
    Passport.authenticate("local", (err: Error, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json(info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Success" });
        });
    })(req, res, next);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
