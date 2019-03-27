const express = require('express')
const app = express()
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const gqlConfigs = require('./graphqlConfigs')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const controller = require('./controller')
const authController = require('./authController')


// Database connection
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    exports.database = dbInstance
    console.log('Connected to database ⌨')
}).catch(error => console.log('------------ MASSIVE error', error))

// Middlewares
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // 14 days
    }
}));
app.use(express.static(`${__dirname}/../build`));
// GraphQL server initialization
app.use(cors())
app.use('/graphiql', graphqlHTTP({
    schema: gqlConfigs.schema,
    rootValue: gqlConfigs.root,
    graphiql: true
}))

// --------- Express Endpoints ---------

app.post('/api/contact/email', controller.sendContactEmail)
// Bcrypt Registration
app.post('/api/register', authController.bcryptRegister)
// Bcrypt Login
app.post('/api/login', authController.bcryptLogin);
// Logout destroys session
app.post('/api/logout', authController.logout);
// Return user session
app.get('/api/user', authController.getUser)
// Middleware function for ensuring login
function ensureLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(403).json({ message: 'You are not authorized' });
    }
}


const PORT = 4010
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT} 🌄`))

const path = require('path')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname), '../build/index.html')
})