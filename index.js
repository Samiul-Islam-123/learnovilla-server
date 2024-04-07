// Import required modules
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const ConnectToDatabase = require('./Database/Connection');
const cors = require('cors');

const SignupRoute = require('./Routes/AuthRoutes/Signup')
const Login = require('./Routes/AuthRoutes/login');
const Verify = require('./Routes/AuthRoutes/Verification')

const PostRouter = require('./Routes/AppRoutes/PostRoutes');
const GetRoutes = require('./Routes/AppRoutes/GetRoutes');

// Create Express app
const app = express();

//configuring dotenv
dotenv.config();
app.use(express.json())
app.use(cors());

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
app.use('/auth', Login)
app.use('/auth', Verify)

app.use('/app', PostRouter);
app.use('/app', GetRoutes);



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

// Start the server and listen on the defined port
  server.listen(PORT, async() => {
    console.log(`Initiating Server...`);
    await ConnectToDatabase(process.env.SAMIUL_DB_URL)
    console.log(`Server is up running at ${PORT}`);
});
