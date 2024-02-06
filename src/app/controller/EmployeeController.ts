import { getRepository } from "typeorm";
import { Response } from "express";
import { Request } from "express";
import { UserInfo } from "../../config/db/entities/UserInfo";
import { CheckInOut } from "../../config/db/entities/CheckInOut";
import moment from "moment";

interface EmployeeDetails {
    employeeId: number;
    employeeName: string;
    summaryHours: string;
}

export class EmployeeController {
    static isValidParameter(
        value: any,
        minValue: number,
        maxValue: number,
        paramName: string
    ): boolean {
        return !isNaN(value) && value >= minValue && value <= maxValue;
    }
    static getEmployeeDetails = async (req: Request, res: Response) => {
        const employeeId = parseInt(req.params.userId, 10);
        const month = parseInt(req.params.month, 10);
        const year = parseInt(req.params.year, 10);
        // Kiểm tra tính hợp lệ
        if (
            !EmployeeController.isValidParameter(month, 1, 12, "month") ||
            !EmployeeController.isValidParameter(year, 2021, 2023, "year") ||
            !EmployeeController.isValidParameter(employeeId, 1, 49, "userId")
        ) {
            return res.status(400).json({
                message: "Invalid parameter",
            });
        }

        try {
            const employee = await getRepository(UserInfo).findOne({
                where: { UserEnrollNumber: employeeId },
            });
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            let employeeDetails: EmployeeDetails | null = null;
            const timeCheck = await getRepository(CheckInOut).query(
                `SELECT 
                        MAX(TimeStr) as maxTime, 
                        MIN(TimeStr) as minTime, 
                        DATEADD(day, DATEDIFF(day, 0, TimeStr), 0) as date
                      FROM dbo.CheckInOut 
                      WHERE UserEnrollNumber = ${employeeId} 
                        AND Year(TimeStr) = ${year} 
                        AND Month(TimeStr) = ${month}
                      GROUP BY DATEADD(day, DATEDIFF(day, 0, TimeStr), 0)`
            );

            if (timeCheck.length > 0) {
                const timeDiffArray = timeCheck.map((result: any) => {
                    const timeDiff =
                        moment(result.maxTime, "M/D/YYYY h:mm:ss A").diff(
                            moment(result.minTime, "M/D/YYYY h:mm:ss A"),
                            "seconds"
                        ) / 3600;
                    return timeDiff;
                });
                let sum = 0;
                for (let k = 0; k < timeDiffArray.length; k++) {
                    sum += timeDiffArray[k];
                }

                employeeDetails = {
                    employeeId: employee.UserEnrollNumber,
                    employeeName: employee.UserFullName,
                    summaryHours: sum.toFixed(2),
                };
            }
            if (!employeeDetails) {
                return res.status(404).json({ message: "No data found" });
            } else return res.status(200).json({ employeeDetails });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Internal server error", error });
        }
    };
}
