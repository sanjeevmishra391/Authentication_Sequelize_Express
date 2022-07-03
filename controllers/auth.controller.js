const { User, VerificationToken, PasswordReset, Balance } = require('../models/index');
const bcrypt  = require("bcrypt");
const {sendVerificationEmail, sendPasswordResetEmail} = require('../utils/email.util');
const crypto = require('crypto');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login =  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(404).send('Invalid Credentials');
        else {
            req.logIn(user, (err) => {
                if (err) res.send({ err });
                console.log(req.user);
                const token = jwt.sign(
                    {
                        id: req.user.id,
                        email: req.user.email
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    }
                );
                res.header('auth-token', token).send(token);
            });
        }
    })(req, res, next);
}

exports.isAuthenticated = async (req, res) => {
    const authenticated = typeof req.user !== 'undefined';
    console.log(authenticated);
    res.status(200).json({
      authenticated
    });
};

// signup controller
exports.signUp = async (req, res) => {
    try {
        const u = req.body;

        // check is email is signed up or not.
        let user = await User.findAll({
            where : {
                email : u.email
            }
        });

        if(user.length!=0) {
            return res.status(401).send({"message" : "This email is already signed up."});
        }

        // create hash of the password
        var hashedPassword = bcrypt.hashSync(req.body.password.trim(), 10);
        console.log(hashedPassword);

        // store the user information and send the response.
        user = await User.create({...req.body, password: hashedPassword});
        const randomToken = crypto.randomBytes(16).toString('hex');
        info = await VerificationToken.create({
            userId: user.id,
            token: randomToken
        });

        let balance = await Balance.create({
            userId: user.id
        });
        console.log(balance);
        sendVerificationEmail(user.email, info.token);
        return res.status(200).json(`${user.email} account created successfully. Verify your account`);

    } catch (error) {
        res.json({ message: error.message });
    }
};

// controller for verification of the user using mail.
exports.verifyUser = async (req, res) => {
    try {
        // find if user exists and get check if he is verified.
        let users = await User.findAll({
        where: { email: req.params.email }
        })

        if(users[0].isVerified) {
            return res.status(202).json(`Email Already Verified`);
        }

        // find the token of verification link in the database.
        let foundToken = await  VerificationToken.findOne({
                where: { token: req.params.token }
            })

        if(foundToken) {
            // update the user as verified user.
            await User.update(
                { isVerified: true }, 
                { where : 
                    { id: users[0].id }
                });
            
            return res.status(403).json(`User with ${users[0].email} has been verified`);
        } else {
            return res.status(403).json(`Verification failed`);
        }
    } catch(err) {
        return res.status(404).json(err);
    }
}

// send mail for password reset
exports.sendResetLink = async (req, res) => {
   const email = req.body.email;
   console.log(email);
   try {
            const randomToken = crypto.randomBytes(16).toString('hex');
            await PasswordReset.create({email: email, token:  randomToken})
            sendPasswordResetEmail(email, randomToken);
            return res.send("Please check your email for the next step");
   } catch (error) {
       res.send(error.message)
   }
}

// link to verify password reset token
exports.verifyPasswordReset = async (req, res) => {
    try {
            const user = await PasswordReset.findOne({
                where: {token : req.params.token}
            })
            console.log(user);
            if(user) {
                return res.send({email: user.email});
            }

            return res.send({message: "Some error occured"});

    } catch (error) {
            res.status(404).send(error.message)
    }
}

// change password
exports.changePassword = async (req, res) => {
    const {
        email,
        token,
        newpassword
    } = req.body;

    try {

        let user = await PasswordReset.findOne({
            where: {email: email, token : token}
        })

        if (user.length === 0) {
            return res.status(404).send("an error occured")
        }

        //hash new password

        var hashedPassword = bcrypt.hashSync(newpassword.trim(), 10);

        //update the users table!

        user = await User.update({password: hashedPassword}, {
                where: {email: email}
            });
        //clear the record in "password_reset" table for security

        await PasswordReset.destroy({
            where: {email: email}
        })
        return res.send("password successfully changed!")
    } catch (error) {
        res.send(error.message)
    }
}