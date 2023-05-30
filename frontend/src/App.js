import React, { useEffect, useState } from 'react'
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from 'axios';


function App() {

  const [messages, setMessages] = useState([]);

//When app component load run this piece of code : use of useEffect

useEffect(() => {
  axios.get('http://localhost:8080/messages/sync')
  .then((response) =>{
    setMessages(response.data);
  });

}, []);

useEffect(() => {

  const pusher = new Pusher('5be3d18770716a348eb0', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage) => {
    setMessages([...messages, newMessage])

  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };

  
  
}, [messages]);

console.log(messages);

  return (
    <div className="app">
      {/* <h1> Lets build a Mern Whatsapp clone</h1> */}

      <div className='app_body'>

        {/* Sidebar Component */}

        <Sidebar />

        {/* chat Component */}

        <Chat meremesssages={messages} />


      </div>



    </div>
  );
}

export default App;
