const { User, VerificationToken } = require('../models/index');
const {generateToken} = require('../utils/index');
const bcrypt  = require("bcrypt");
const {sendVerificationEmail} = require('../utils/emailVerify.util');
const random = require('crypto').randomBytes(16).toString('hex');

// login controller
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // check if email is signed up or not
        const user = await User.findAll({
            where: {
                email: email
            }
        })

        if(user.length==0) {
            return res.status(404).send({message : "Email is not signed up."});
        }

        // if email is signed up then compare the stored password and input password
        const validPassword = await bcrypt.compare(password, user[0].password);
        if(!validPassword) {
            return res.status(404).send({message : "Credentials do not match."});
        }

        // generate token and send response.
        const accessToken = generateToken(user[0]);
        res.json({message: "User logged in", accessToken: accessToken, user: user})
        
    } catch (error) {
        res.json({message : error.message});
    }
}

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
        info = await VerificationToken.create({
            userId: user.id,
            token: random
        });

        sendVerificationEmail(user.email, info.token);
        return res.status(200).json(`${user.email} account created successfully`);

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
        let foundToken = await  VerificationToken.findAll({
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
