// Import required modules
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const ConnectToDatabase = require('./Database/Connection');

const SignupRoute = require('./Routes/AuthRoutes/Signup')
// Create Express app
const app = express();

//configuring dotenv
dotenv.config();
app.use(express.json())

// Create HTTP server using Express app
const server = http.createServer(app);

// Create Socket.IO server and attach it to the HTTP server
const io = socketio(server);

// Define port number, use environment variable PORT if available, otherwise use port 5000
const PORT = process.env.PORT || 5000;

//routes
app.get('/',(req,res)=>{
  res.json({
    sucess : true,
    message : "helloww"
  })
})

//custom routes
app.use('/auth', SignupRoute);

// Start the server and listen on the defined port
	server.listen(PORT, async() => {
    await ConnectToDatabase(process.env.DB_URL)
    console.log(`Server is running at ${PORT}`);
});

// Socket.IO event handlers
io.on('connection', (socket) => {
    // Event handler when a user connects
    console.log('A user connected');

    // Event handler when a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Example event handler for receiving and broadcasting chat messages
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the received message to all connected clients
    });
});
