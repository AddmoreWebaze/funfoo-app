require('dotenv').config()

const express = require('express')
const path = require('path')
const ejs = require('ejs')

const app = express()

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/dist'))

app.use(express.static(path.join(__dirname, '/dist')))

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(Number(process.env.VUE_APP_PORT), () => {
  console.log(`Running on port: ${process.env.VUE_APP_PORT}`)
})