const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../middleware/generateToken");


const signup = async(req,res) => {

    try{
        const {email,userName,password} = req.body; 
        console.log(password);

        if(!email || !userName || !password) {
            return res.status(401).json({error : "All fileds are required"});
        }
    
        const user = await User.findOne({email});
        if(user){
            return res.status(402).json({error : "User already exists"});
        }
        
        let hashedPassword = await bcrypt.hash(password,10);
    
        const newUser = new User({
            email,
            userName,
            password : hashedPassword,
        })
    
        if (newUser){
            generateTokenAndSetCookie(newUser._id , res);
            await newUser.save();
    
            res.status(200).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch(err){
        console.error("error in signup controller :", err.message)
        res.status(500).json({ error: "validaiton error" })
    }

}
const login = async(req,res) => {
    try{
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(401).json({error : "all field are required"})
    }

    const user = await User.findOne({email});
    if(user){
        let matched =  await bcrypt.compare(password, user?.password || "");
        if(matched){
            await generateTokenAndSetCookie(user._id,res);
            return res.status(200).json({
                userName : user.userName,
                email : user.email,
            })
        }
    }
    return res.status(400).json({ error: 'invalid credential' })
    }
    catch(err){
        console.log("Error in login controller", err.message);
        res.status(500).json({ error: "Internal server error" })
    }

}

module.exports = {
    signup,
    login,
}