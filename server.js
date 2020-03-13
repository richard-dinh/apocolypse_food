const express = require('express')
const {join} = require('path')

//bring in dotenv
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(join(__dirname, 'public')))


app.listen(3000)