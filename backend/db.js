import mongoose from "mongoose";

const connection_url = "mongodb+srv://myadmin:PZuZ0QmdjCN1btxw@cluster0.wcjg0st.mongodb.net/whatsappDB?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connection_url , {
            useNewUrlParser: true,
    useUnifiedTopology: true

        });
        console.log(`Mongodb Connected: ${conn.connection.host}`);
    }catch(error) {
        console.error(`Error: ${error.message}`);
    }
};

export default connectDB;