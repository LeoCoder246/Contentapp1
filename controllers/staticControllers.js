const User =  require('../models/userModels');
const Notice = require('../models/noticeModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../service/jwtService');
function getlandingPage(req,res){
    res.render('staticViews/landingPage',{ user: req.user || null });
}
const getHome= async(req,res) =>{
    const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 2); 
        threeDaysAgo.setHours(0, 0, 0, 0); 
        const now = new Date();
        const notices = await Notice.find({
          createdAt: { $gte: threeDaysAgo,  $lte: now}
        })
        .sort({ createdAt: -1 }) 
        .populate('createdBy');
    
    
    res.render('staticViews/home',{ user: req.user, notices });
}

const getRegister = (req,res) =>{
    res.render('staticViews/register',{ user: req.user || null,currentUrl: req.originalUrl  });
}
const getLogin = (req,res) =>{
    res.render('staticViews/login',{ user: req.user || null });
}
const postRegister = async(req, res) => {
    const {username,email,password,secretkey} = req.body;
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).send("User with this email already exists");
    }
    let role = "user";
    let secretkey1= 'secretkey12345';
    if( secretkey1 === secretkey){
       role = "admin"
    }
    const user = await User.create({
        username,
        email,
        password,
        role
        });
    console.log("User registered:", user);
    return res.redirect('/login');
};
const postLogin =async (req, res) => {
    try {
        const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 2); 
            threeDaysAgo.setHours(0, 0, 0, 0); 
           
            const now = new Date();
            const notices = await Notice.find({
              createdAt: { $gte: threeDaysAgo,  $lte: now}
            })
            .sort({ createdAt: -1 }) 
            .populate('createdBy');
        

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


        const token = createToken(user);

      
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.redirect('/home' );  
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {getHome,postLogin, getRegister, postRegister, getLogin, getlandingPage};