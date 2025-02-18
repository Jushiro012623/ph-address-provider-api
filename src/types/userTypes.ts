export interface IUser {
    id : number | string;
    email : string;
    username : string;
    password : string;
    createdAt : Date;
    updatedAt : Date;
}