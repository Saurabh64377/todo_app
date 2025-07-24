const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            // Verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)

           
            
            const user = await User.findById(decoded.id).select('-password');
            // console.log(user)

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized user!' });
            }

            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized access', success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = verifToken;
