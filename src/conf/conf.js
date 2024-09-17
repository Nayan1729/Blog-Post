/* Inside this conf.js file what we will solve is that the process of writting import.meta.env.whatever is very tendious and
    also this way of representing had a problem that if the value from this "whatever" isnt of the type it is supposed to be
    then it can cause the website the crash  (Big issue in type Script)
    So in production apps this file  is generally made in the conf folder inside the src folder
*/

const conf ={
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    projectId : (import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf