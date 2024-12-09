import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import router from './router';
import connectDB from './config/database';
import http from 'http';
import { initSocket } from './config/sockets';
const server = express()
const port = process.env.PORT || 8080

connectDB();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(cors(corsOptions))
server.use(bodyParser.json())

const httpServer = http.createServer(server);

const io = initSocket(httpServer);

server.use('/static', express.static('public'))
server.use('/api', router)

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})

