import { getRepository } from "typeorm";
import { Response } from "express";
import { Request } from "express";
import { UserInfo } from "../model/UserInfo";
import { CheckInOut } from "../model/CheckInOut";
import moment from "moment";

interface EmployeeDetails {
    employeeId: number;
    employeeName: string;
    checkInOut: {
        month: number;
        year: number;
        summaryHours: string;
    }[];
}

export class EmployeeController {
    static getEmployeeDetails = async (req: Request, res: Response) => {
        const employeeId = parseInt(req.params.userId, 10);
        try {
            const employee = await getRepository(UserInfo).findOne({
                where: { UserEnrollNumber: employeeId },
            });
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            const employeeDetails: EmployeeDetails = {
                employeeId: employee.UserEnrollNumber,
                employeeName: employee.UserFullName,
                checkInOut: [],
            };

            for (let i = 2021; i <= 2023; i++) {
                for (let j = 1; j <= 12; j++) {
                    const timeCheck = await getRepository(CheckInOut).query(
                        `SELECT 
                        MAX(TimeStr) as maxTime, 
                        MIN(TimeStr) as minTime, 
                        DATEADD(day, DATEDIFF(day, 0, TimeStr), 0) as date
                      FROM dbo.CheckInOut 
                      WHERE UserEnrollNumber = ${employeeId} 
                        AND Year(TimeStr) = ${i} 
                        AND Month(TimeStr) = ${j}
                      GROUP BY DATEADD(day, DATEDIFF(day, 0, TimeStr), 0)`
                    );
                    if (timeCheck.length > 0) {
                        const timeDiffArray = timeCheck.map((result: any) => {
                            const timeDiff =
                                moment(
                                    result.maxTime,
                                    "M/D/YYYY h:mm:ss A"
                                ).diff(
                                    moment(
                                        result.minTime,
                                        "M/D/YYYY h:mm:ss A"
                                    ),
                                    "seconds"
                                ) / 3600;
                            return timeDiff;
                        });
                        let sum = 0;
                        for (let k = 0; k < timeDiffArray.length; k++) {
                            sum += timeDiffArray[k];
                        }
                        employeeDetails.checkInOut.push({
                            month: j,
                            year: i,
                            summaryHours: sum.toFixed(2),
                        });
                    }
                }
            }
            return res.status(200).json({ employeeDetails });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Internal server error", error });
        }
    };
}
