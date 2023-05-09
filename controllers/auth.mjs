import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const signup = (req, res, next) => {
    console.log(req.body);
    // checks if email already exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: passwordHash,
                        AccountInit: 1,
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.firstName) {
            return res.status(400).json({message: "first name not provided"});
        } else if (!req.body.lastName) {
            return res.status(400).json({message: "last name not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    const userId = dbUser.UserID;
                    const email = dbUser.email;
                    const firstName = dbUser.firstName;
                    const lastName = dbUser.lastName;
                    const accountInit = dbUser.AccountInit;
                    const user = {userId, email, firstName, lastName, accountInit};
                    if (user.accountInit === 0) {
                        res.status(200).json({message: "user logged in", "token": token, user: user});
                    } else {
                        res.status(200).json({message: "user logged in", "token": token, user: user});
                    }
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

export { signup, login, isAuth };