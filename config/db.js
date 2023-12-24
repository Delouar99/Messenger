import mongoose from "mongoose";

export const mongoDbConnect = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongobd connect successfully`.bgMagenta.black);
    } catch (error) {
      console.log(`${error.message}`.bgRed.black);  
    }
}