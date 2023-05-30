import React, {useState } from 'react'
import "./Chat.css";
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from 'axios';

function Chat({ meremesssages }) {

  const [inputt, setInputt] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
  
    await axios.post("http://localhost:8080/messages/new", {
    "message": inputt,
    "name": "Vashu",
    "timeStamp": "galaxy",
    "received": false,
    });

    setInputt("");
  };
  return (
    <div className='chat'>
    <div className='chat_header'>
      <Avatar />

      <div className='chat_headerInfo'>
        <h3>Room name</h3>
        <p>Last seen at...</p>

      </div>

      <div className='chat_headerRight'>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>

        <IconButton>
          <AttachFile />
        </IconButton>

        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>

    <div className='chat_body'>

     {meremesssages?.map(message =>  (

<p className={`chat_message ${message.received && "chat_reciever"}`}> 

<span className='chat_name'>{message.name}</span>
{message.message}

<span className='chat_timestamp'>{message.timeStamp}</span>

</p>

     ) )};
      
    </div>

    <div className='chat_footer'>

      <InsertEmoticonIcon />
      <form>
        <input 
        value={inputt} 
        onChange={(e) => setInputt(e.target.value)} 
        placeholder='Type a message' type='text' 
        />
        <button onClick={sendMessage} type='submit'>Send a message</button>
      </form>

      <MicIcon />


    </div>


    </div>
  )
}

export default Chat