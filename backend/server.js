// importing
import express from 'express'
import mongoose from 'mongoose';
import Messages from './dbMessages.js'
import connectDB from './db.js';
import Pusher from 'pusher';
import cors from 'cors';



// app config
const app = express();
const port = process.env.PORT || 8080;


const pusher = new Pusher({
    appId: "1586943",
    key: "5be3d18770716a348eb0",
    secret: "be56b4bba5a8fcc3d755",
    cluster: "ap2",
    useTLS: true
  });

// middleware

app.use(express.json());


app.use(cors());


// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })


// DB Config


connectDB();

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch()

// to check when something is fired of in database

    changeStream.on("change", (change) => {

        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', 
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timeStamp,
                received: messageDetails.received,

            });
        }else {
            console.log("Error Triggering Pusher");
        }
    
    });

});







// api routes

app.get('/',(req, res) => res.status(200).send("hello ji"));


app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            
            res.send(err);
        }
        else {
            res.send(data)
        }

    })
});

app.post("/messages/new", (req, res) => {
    const dbMessage = new Messages(req.body);
    // console.log(JSON.stringify(dbMessage));
    // Messages.create(dbMessage);
    // res.send(dbMessage);

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            console.log("Error hai");
            res.status(500).send(err)
        }
        else {
            console.log("sent");
            res.status(201).send(data)
            console.log(data);
        }
    });



});

// app.post('/new', (req, res) => {
//     let data = req.body;
//     res.send('Data Received: ' + JSON.stringify(data));
// })


// listen

app.listen(port , () => console.log(`listing to port:${port}`));