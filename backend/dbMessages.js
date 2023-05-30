import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    received: Boolean
});

const Messages = mongoose.model("messagecontent",whatsappSchema);
export default Messages;