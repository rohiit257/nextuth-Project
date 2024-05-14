import mongoose from "mongoose";

export async function connectDb(){
    try {

        mongoose.connect(process.env.MONGODB_URL!)//TYPESCRIPT NEEDS TYPESAFETY SO WE USE ! THAT WE HAVE GURANTEE THAT STRING WILL COME
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log('====================================');
            console.log('MongoDb Connected');
            console.log('====================================');
        
        
        })
        connection.on("error",(err)=>{
            console.log('====================================');
            console.log('MongoDb Connection Error '+ err);
            console.log('====================================');
            process.exit()
        })
    
    } catch (error) {
        console.log('====================================');
        console.log("something went wrong while connecting db",error);
        console.log('====================================');
    }
}