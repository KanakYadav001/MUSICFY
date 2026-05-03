import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';


export const register = async (req, res) => {
    const { email, fullName: { firstName, lastName }, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const hastedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        fullName: { firstName, lastName },
        password: hastedPassword,
    });

    const token = jwt.sign({ Id: user._id  , role: user.role , email: user.email }, config.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token)

    res.status(201).json({ message: 'User registered successfully',
        user
     });
}



export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const IsUserExist = await User.findOne({ email });
    if (!IsUserExist) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }


    const isPasswordValid = await bcrypt.compare(password, IsUserExist.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ Id: IsUserExist._id , role: IsUserExist.role , email: IsUserExist.email }, config.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token)



    res.status(200).json({ message: 'Login successful' , token  });

}
