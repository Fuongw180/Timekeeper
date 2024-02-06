import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CheckInOut } from "./CheckInOut";

@Entity({ name: "dbo.UserInfo" })
export class UserInfo {
    @PrimaryGeneratedColumn()
    UserEnrollNumber: number;

    @PrimaryGeneratedColumn()
    UserFullCode: string;

    @Column()
    UserFullName: string;

    @Column()
    UserLastName: string;

    @Column()
    UserEnrollName: string;

    @Column()
    UserCardNo: string;

    @Column()
    UserHireDay: Date;

    @Column()
    UserIDTitle: number;

    @Column()
    UserSex: number;

    @Column()
    UserBirthDay: string;

    @Column()
    UserBirthPlace: number;

    @Column()
    UserPhoto: string;

    @Column()
    UserNoted: string;

    @Column()
    UserPW: string;

    @Column()
    UserPrivilege: number;

    @Column()
    UserEnabled: boolean;

    @Column()
    UserIDC: number;

    @Column()
    UserIDD: number;

    @Column()
    SchID: number;

    @Column()
    UserGroup: number;

    @Column()
    UserTZ: string;

    @Column()
    UserPin1: string;

    @Column()
    PushCardID: string;

    @Column()
    UserNationality: number;

    @Column()
    UserNativeCountry: string;

    @Column()
    UserIDCard: string;

    @Column()
    IDCardPlaceOfIssue: string;

    @Column()
    UserCalledName: string;

    @Column()
    UserAddress: string;

    @Column()
    UserPhoneNumber: string;

    @Column()
    RelationshipName: string;

    @Column()
    VerifyType: number;

    // Add other relevant columns for the employee entity
    @OneToMany(() => CheckInOut, (checkInOut) => checkInOut.userInfo)
    checkInOuts!: CheckInOut[];

    constructor(
        UserEnrollNumber: number,
        UserFullCode: string,
        UserFullName: string,
        UserLastName: string,
        UserEnrollName: string,
        UserCardNo: string,
        UserHireDay: Date,
        UserIDTitle: number,
        UserSex: number,
        UserBirthDay: string,
        UserBirthPlace: number,
        UserPhoto: string,
        UserNoted: string,
        UserPW: string,
        UserPrivilege: number,
        UserEnabled: boolean,
        UserIDC: number,
        UserIDD: number,
        SchID: number,
        UserGroup: number,
        UserTZ: string,
        UserPin1: string,
        PushCardID: string,
        UserNationality: number,
        UserNativeCountry: string,
        UserIDCard: string,
        IDCardPlaceOfIssue: string,
        UserCalledName: string,
        UserAddress: string,
        UserPhoneNumber: string,
        RelationshipName: string,
        VerifyType: number
    ) {
        this.UserEnrollNumber = 0;
        this.UserFullCode = "";
        this.UserFullName = "";
        this.UserLastName = "";
        this.UserEnrollName = "";
        this.UserCardNo = "";
        this.UserHireDay = new Date();
        this.UserIDTitle = 0;
        this.UserSex = 0;
        this.UserBirthDay = "";
        this.UserBirthPlace = 0;
        this.UserPhoto = "";
        this.UserNoted = "";
        this.UserPW = "";
        this.UserPrivilege = 0;
        this.UserEnabled = false;
        this.UserIDC = 0;
        this.UserIDD = 0;
        this.SchID = 0;
        this.UserGroup = 0;
        this.UserTZ = "";
        this.UserPin1 = "";
        this.PushCardID = "";
        this.UserNationality = 0;
        this.UserNativeCountry = "";
        this.UserIDCard = "";
        this.IDCardPlaceOfIssue = "";
        this.UserCalledName = "";
        this.UserAddress = "";
        this.UserPhoneNumber = "";
        this.RelationshipName = "";
        this.VerifyType = 0;
    }
}
