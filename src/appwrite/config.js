// Here are all the files that are required after we have logged in to the website
import conf from "../conf/conf.js"
import authService from "./auth.js";
import {Client,ID,Databases,Storage,Query,Permission,Role,ImageFormat,ImageGravity} from "appwrite"
const permissions = [
    // Grant authenticated users create and update permissions
    Permission.write(Role.users()),  // Allow authenticated users to create
    Permission.read(Role.users()),    // Allow authenticated users to read
    Permission.update(Role.users())   // Allow authenticated users to update
]
export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.projectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
    }
    // Slug is basically a url-friendly string where spaces are converted into hyphens and everything is in small letters
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const user = await authService.getCurrentUser()
            console.log(user);
            
           return await this.databases.createDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,

            }
           ) 
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
            
        }
    }
    // The reason we are using slug is to get the unique documentId from it and with this we can update the document that we want
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite error :: updatePost :: error ",error);
        }
    }
    async deletePost(slug){
      try {
          await this.databases 
                          .deleteDocument(
                            conf.databaseId,
                            conf.collectionId,
                            slug,
                            
                        )
                    return true
      } catch (error) {
        console.log("Appwrite error :: deletePost :: error ",error);
        return false
      }

    }
    async getPost(slug){
        try {
           return await this.databases.getDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
        )

        } catch (error) {
            console.log("Appwrite error :: getPost :: error ",error);
        }
    }
    /*/
        Whatever attribute u want to use in queries u can only use it if it is used as a indexes 
        So on whichever attribute u want to assign these queries u must make a index of that query   
     */
    async getPosts(queries = [Query.equal("status","active")]){
        try {
         return await this.databases
                .listDocuments(
                    conf.databaseId,
                    conf.collectionId,
                    queries,
                    permissions
                )// After queries we can also perform pagination as well by passing more parameters in this listDocument method
        } catch (error) {
            console.log("Appwrite error :: getPosts :: error ",error);
        }
    }

    //file = complete file
    async uploadFile(file){
        try {
          return await this.bucket
                    .createFile(
                        conf.bucketId,
                        ID.unique(),
                        file,
                        
                    )

        } catch (error) {
            console.log("Appwrite error :: uploadFile :: error ",error);
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId,
                
            )
            return true
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: error ",error);
            return false
        }
    }
     getFilePreview(fileId){
        return this.bucket
                    .getFilePreview(
                        conf.bucketId,
                        fileId,
                        300,
                        300,
                        ImageGravity.Center,
                        100,
                        0                      
                    )
    }
}

const service = new Service()

export default service
