import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import router from './router';
import connectDB from './config/database';

const server = express()
const port = process.env.PORT || 8080

connectDB();

server.use(cors())
server.use(bodyParser.json())

server.use('/api', router)

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})

