const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true,
             useUnifiedTopology: true 
        });
        console.log("mongoDb Connected");
    }catch(error){
        console.error("MongoDb Connection Error:" , error);
    }
}


module.exports = connectDB;