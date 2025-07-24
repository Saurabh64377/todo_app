const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required", success: false });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(404).json({ message: "User already exists", success: false });

        const newUser = await User.create({ name, email, password });

        return res.status(201).json({ 
            message: "User registered successfully",
             success: true, 
             user: { name: newUser.name, email: newUser.email } 
            });
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and password are required", success: false });

        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found", success: false });

        const isMatch = await user.comparePassword(password);

        if (!isMatch)
            return res.status(401).json({ message: "Invalid password", success: false });

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ message: "Login successful", success: true, token , name:user.name });
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

exports.userFindById = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id)

        if(!user){
            return res.json(401).json({message:"User not found !" , success:false})
        }
         
        return res.status(200).json({
            message:"User fetched successfully !",
            success:true,
            userData:{
                name:user.name,
                email:user.email
            }
        })

    } catch (error) {
         return res.status(500).json({ message: "Server error", success: false, error: error.message });
        
    }
}

exports.allUsers  = async(req,res)=>{
    try {
        const users = await User.find();

         return res.status(200).json({ message: "All user fetched successfully", success: true, users });
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
        
    }
}
