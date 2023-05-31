const dotenv = require('dotenv').config()
import express from "express";
import bodyParser from 'body-parser'


const index = express()

const PORT = process.env.PORT

index.use(bodyParser.json())
index.use(bodyParser.text())
index.use('/', require('./module/route'))

index.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})