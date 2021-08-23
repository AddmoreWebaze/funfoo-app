require('dotenv').config()

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const port = Number(process.env.VUE_APP_PORT) || 8080

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


app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})