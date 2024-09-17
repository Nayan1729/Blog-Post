/*
    In this folder what we do is that we make services and make use of those services  for authentication in this file 
    The reason for making those services is that appwrite is a "backend as a product" service and hence if at some point we decide to remove appwrite and
    use another service then these services are the same u just have to modify the inside of these services
*/

import {Client,Account,ID} from 'appwrite'
import conf from "../conf/conf"
export class AuthService{
    client = new Client();
    account;    
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        
        
        this.account = new Account(this.client)
    }
    // Here we create the services of login,signup ... where we use the appwrite documentation

    async createAccount({email,name,password}){
        try {
            
            
           const userAccount =  await this.account.create(ID.unique(),email,password,name)
           console.log(`${userAccount.email}`);
           
           if(userAccount)
           {
            //Call Another Method i.e if user has created account and signed then login the user
            return this.login({email,password})
           }
           else{
                return userAccount 
                // If it is null then it will be handled as required
           }
        } catch (error) {
            throw error
        }
    }
    async login({email,password}){
       try {
            console.log("Login ::");
            console.log(email);
            return await this.account.createEmailPasswordSession(email,password)
       } catch (error) {
        console.log("auth :: login :: error " +error );
       }
    }
     getCurrentUser(){
        try {
            console.log(" "+this.account.get());
            
           return this.account.get();
        } catch (error) {
            console.log("getCurrentUser error" +error );
        }
        return null
    }
    async logout(){
        try {
           return await this.account.deleteSessions();

        } catch (error) {
            console.log("logout error"+error);
        }
    }
}
//Here we are exporting a object . The reason being that we can easily use this object whenever we want and dont have to make the object in any otherfile
// We can easily use this object to access whatever method we need 
const authService = new AuthService()

export default authService
