import { log } from "console";
import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URl!)
        const connection=mongoose.connection

        connection.on('connected',()=>{
            console.log("Db is connected");
            
        })

        connection.on('error',(err)=>{
            console.log('Db connection error please make sure db '+err);
            process.exit()
            
        })
    } catch (error) {
        console.log("Something went wrong in connecting DB");
        console.log(error);
        
        
    }
}