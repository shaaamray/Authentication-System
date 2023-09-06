// controllers do the actions after getting the order from routes, it works with the models

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret_key = "bolajabena";

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exits! Login pls" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name: name, // can write name, as it works name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: user });
};

const login = async(req, res, next) => {
    const {email, password} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email : email});
    }catch(err){
        return new Error(err);
    }

    if(!existingUser){
        return res.status(400).json({message: "User not found! Signup pls"});
    }

    const chkPassword = bcrypt.compareSync(password, existingUser.password);
    if(!chkPassword){
        return res.status(400).json({message: "Password is wrong"});
    }

    const token = jwt.sign({id: existingUser._id}, jwt_secret_key, {expiresIn: "35s"});

    res.cookie(String(existingUser._id), token, {
      path : "/",
      expires : new Date(Date.now()+ 1000*30),
      httpOnly : true, // so that token is not shown in frontend
      sameSite : "lax",
    });

    return res.status(200).json({message: "Logged in successful", user: existingUser, token});
}

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1]; // index 1 holds the token

    if(!token){
      res.status(400).json({message: "No token found"});
    }
    jwt.verify(String(token), jwt_secret_key, (err, user) =>{
      if(err){
        res.status(400).json({message: "Invalid Token"});
      }
      console.log(user.id);
      req.id = user.id;
    })
    next();
}

const getUser = async(req, res, next) => {
  const userId = req.id;
  let user;

  try{
    user = await User.findById(userId, "-password");
  }catch(err){
    return new Error(err);
  }

  if(!user){
    return res.status(404).json({message: "User not found"});
  }
  return res.status(200).json({user});
}

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if(!prevToken){
    return res.status(400).json({message: "Token not found"})
  };
  jwt.verify(String(prevToken), jwt_secret_key, (err, user) => {
    if(err){
      console.log(err);
      return res.status(403).json({message: "Authentication failed"})
    }
    res.clearCookie(`${user.id}`);
    res.cookies[`${user.id}`] = "";

    const token = jwt.sign({id : user.id}, jwt_secret_key, {
      expiresIn: "35s"
    });

    res.cookie(String(user.id), token, {
      path : "/",
      expires : new Date(Date.now()+ 1000*30),
      httpOnly : true, // so that token is not shown in frontend
      sameSite : "lax",
    });

    req.id = user.id;
    next();
  })
}

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;