require('dotenv').config()

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const port = Number(process.env.PORT) || 80

const app = express()

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.use(express.static(path.join(__dirname, '/dist')))

/*
app.get('/', (req, res) => {
  res.render('index');
})*/


app.listen((process.env.PORT) || 80, () => {
  console.log(`Running on port: ${port}`)
})