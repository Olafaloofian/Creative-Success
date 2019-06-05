const express = require('express')
const app = express()
const cors = require('cors')
// TODO: Implement GraphQL in earnest
const graphqlHTTP = require('express-graphql')
const gqlConfigs = require('./GraphQL/graphqlConfigs')
//
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const nodemailer = require('./Services/nodemailer')
const authController = require('./Controllers/authController')
const userController = require('./Controllers/userController')
const upload = require('./Services/multer')

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

// --------- Express Endpoints --------- //

app.post('/api/contact/email', nodemailer.sendContactEmail)
// Bcrypt Registration
app.post('/api/register', authController.bcryptRegister)
// Bcrypt Login
app.post('/api/login', authController.bcryptLogin);
// Logout destroys session
app.post('/api/logout', authController.logout);
// Return user session
app.get('/api/user', authController.getUser)
// Get all images saved in database
app.get('/api/images', userController.getAllImages)
// Upload new portfolio project
app.post('/api/portfolio', userController.addProject)
// Multer AWS S3 image uploading
const singleUpload = upload.single('image')
app.post('/api/image-upload', (req, res) => {
    singleUpload(req, res, (err, some) => {
        if (err) {
            console.log('Image upload error! ---', err)
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        return res.json({'imageUrl': req.file.location});
    })
})

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