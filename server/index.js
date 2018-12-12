const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const controller = require('./controller')

// Middlewares
app.use(bodyParser.json())

// Express Endpoints
app.post('/api/contact/email', controller.sendContactEmail)

const PORT = 4010
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT} 🌄`))