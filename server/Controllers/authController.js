const numOfSaltRounds = 12
const bcrypt = require('bcrypt')

module.exports = {
    bcryptLogin: (req, res) => {
        const db = req.app.get('db');
        const { email, password } = req.body;
        db.find_user([email]).then(users => {
            if (users.length) {
                bcrypt.compare(password, users[0].password).then(passwordsMatched => {
                if (passwordsMatched) {
                    req.session.user = {
                        id: users[0].id,
                        firstName: users[0].first_name,
                        lastName: users[0].last_name,
                        email: users[0].email
                    };
                    res.json({ user: req.session.user });
                } else {
                    res.status(401).json({ message: 'Incorrect email or password!' })
                }
                })
            } else {
                res.status(401).json({ message: 'User not registered!' })
            }
        });
    },

    bcryptRegister: (req, res) => {
        const db = req.app.get('db');
        const { email, password, firstName, lastName } = req.body;
        bcrypt.hash(password, numOfSaltRounds).then(hashed => { 
            //WRAP DATABASE FUNCTION IN BCRYPT.HASH
            db.add_user({email, hashed, firstName, lastName}).then(user => {
                req.session.user = {
                    id: user[0].id,
                    email,
                    firstName,
                    lastName
                };
                res.json({ user: req.session.user })
            }).catch(error => {
                console.log('error', error);
                res.status(500).json({ message: 'Something bad happened! '})
            });
        })
    },

    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send();
    },

    getUser: (req, res) => {
        if(req.session.user) {
            res.status(200).json({ user: req.session.user })
        } else {
            res.status(404).send('No user logged in!')
        }
    }
}