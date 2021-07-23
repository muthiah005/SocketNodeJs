const express = require('express');
const http = require('http');
const axios = require('axios');
const index = require('./routes/index');
const  port = process.env.PORT || 8080

const app = express();
app.use(index);


const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: "http://localhost:4001",
		methods: ["GET", "POST"]
	  }
});


io.on('connection',socket=>{
	 console.log('New Client Connected');
	 
	 var ids = setInterval(() => getData(socket), 10000);

	 socket.on('disconnect',()=>{
		 clearInterval(ids);
		  console.log('Client Disconnected')
	 })
});



const getData = async socket => {

	try {
	//   const res = await axios.get('https://api.darksky.net/forecast/0965fe9cbf9f256fd948110b3de503a7/12.9716,77.5946' );
	//   socket.emit('FromAPI', res.data.currently.temperature);

	  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
	//   console.log("res",res)
	  socket.emit('FromAPI', res.data);

	} catch (error) {
	  console.error(`Error: ${error.code}`);
	}
  };

server.listen(port, () => console.log(`Listening on port ${port}`));