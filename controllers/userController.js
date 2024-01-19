const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary')


exports.signUp = async (req, res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword
    } = req.body
        const userExists = await userModel.findOne({email})

        if(userExists){
            return res.status(400).json({
                message: `User with email: ${userExists.email} already exists`
            })
        }

        const NumExists = await userModel.findOne({phoneNumber})

        if(NumExists){
            return res.status(400).json({
                message: `this phone number is already registered`
            })
        }
          
        if(password != confirmPassword){
            return res.status(400).json({
                message: `Password does not match`
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password && confirmPassword, salt)

        const user = await userModel.create({
            firstName:firstName.toLowerCase().charAt(0).toUpperCase() + firstName.slice(1),
            lastName:lastName.toLowerCase().charAt(0).toUpperCase() + lastName.slice(1),
            email:email.toLowerCase(),
            phoneNumber,
            acctNum:phoneNumber.slice(1, 11),
            password: hash,
            confirmPassword: hash
            
        })
        res.status(201).json({
            message: `Welcome, ${user.firstName} ${user.lastName.slice(0,1).toUpperCase()}. You have created an account successfully`,
            data: user
        })

    }catch(err){
        res.status(500).json({
            message: err.message 
        })
    }

}

//Create a login function for the user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the provided detail is an email or phone number
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Check if the provided password is correct
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }

        // Create and sign a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            process.env.secret,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: `Welcome onboard, ${user.firstName} .${user.lastName.slice(0,1).toUpperCase()}. You have successfully logged in`,
            data: user,
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


exports.logOut = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'This user does not exist',
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        user.blacklist.push(token)
        await user.save()

        res.status(200).json({
            message: 'User signed out successfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


exports.getOne = async (req, res) =>{
    try{
        const userId = req.user.userId

        const user = await userModel.findById(userId)

        if(!user){
            return res.status(404).json({
                message: `User not found`
            })
        }
        res.status(200).json({
            message: `User fetched successfully`,
            data: {
                name:`${user.firstName} ${user.lastName}`,
                email: user.email,
                acctNumber: user.acctNumber
            }
        })

    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.createPin = async (req, res) =>{
    try{
        const userId = req.user.userId
        const {pin} = req.body

        if(!pin || pin.length != 4){
            return res.status(400).json({
                message:`enter a valid 4-digit pin`
            })
        }
        // const salt = bcrypt.genSaltSync(10)
        // const hash = bcrypt.hashSync(pin, salt)
        const user = await userModel.findByIdAndUpdate(userId, {pin}, {new: true})

        if(!user){
            return res.status(404).json({
                message: `User not found`
            })
        }
        

       user.Pin = pin
       user.save()

        res.status(201).json({
            message: `Pin created successfully`,
            data: user
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


exports.profileImage = async (req, res) =>{
    try{
        const userId = req.user.userId

        const file = req.file.filename
        const result = await cloudinary.uploader.upload(file)

        const createProfile =  await userModel.findByIdAndUpdate(userId, {
            profileImage: result.secure_url
        }, {new: true})

        if(!createProfile){
            return res.status(403).json({
                message: `Unable to create this user`
            })
        }
        res.status(201).json({
            message: `Welcome, ${createProfile.fullName}. You have created an account successfully`,
            data: createProfile
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}