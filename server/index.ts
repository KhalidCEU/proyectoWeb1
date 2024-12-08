import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import router from './router';
import connectDB from './config/database';

import cookieParser from 'cookie-parser'
const server = express()
const port = process.env.PORT || 8080

connectDB();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(cors(corsOptions))
server.use(bodyParser.json())

server.use(cookieParser());

server.use('/static', express.static('public'))

server.use('/api', router)

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})

