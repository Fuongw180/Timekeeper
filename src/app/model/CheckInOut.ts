import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";

@Entity({ name: "dbo.CheckInOut" })
export class CheckInOut {
    @PrimaryGeneratedColumn()
    UserEnrollNumber: number;

    @Column({ type: "datetime2" })
    TimeStr: Date;

    @Column()
    TimeDate: Date;

    @Column()
    OriginType: string;

    @Column()
    NewType: string;

    @Column()
    Source!: string;

    @Column()
    MachineNo: number;

    @Column()
    WorkCode: number;

    @Column()
    SerialNumber: string;

    @Column()
    EventType: number;

    @Column()
    EventAddr: number;

    @Column()
    CardNo!: string;

    @Column()
    InOutState: number;

    @Column()
    MaskFlag: number;

    @Column()
    Temperature: number;

    // Add other relevant columns for the employee entity
    @ManyToOne(() => UserInfo, (userInfo) => userInfo.checkInOuts)
    @JoinColumn({ name: "UserEnrollNumber" })
    userInfo!: UserInfo;

    constructor(
        UserEnrollNumber: number,
        TimeStr: string,
        TimeDate: Date,
        OriginType: string,
        NewType: string,
        Source: string,
        MachineNo: number,
        WorkCode: number,
        SerialNumber: string,
        EventType: number,
        EventAddr: number,
        CardNo: string,
        InOutState: number,
        MaskFlag: number,
        Temperature: number
    ) {
        this.UserEnrollNumber = 0;
        this.TimeStr = new Date();
        this.TimeDate = new Date();
        this.OriginType = "";
        this.NewType = "";
        this.Source = "";
        this.MachineNo = 0;
        this.WorkCode = 0;
        this.SerialNumber = "";
        this.EventType = 0;
        this.EventAddr = 0;
        this.CardNo = "";
        this.InOutState = 0;
        this.MaskFlag = 0;
        this.Temperature = 0;
    }
}
