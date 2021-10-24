/**
 * LoginRequestI
 */
export interface LoginRequestI {
    email:string;
    password:string;
}
 export class LoginRequest implements LoginRequestI{
     email: string = '';  
     password: string = '';
 }