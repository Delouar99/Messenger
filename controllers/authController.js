import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { dotsToHyphens, hyphensToDots, isEmail, isMobile } from "../helpers/helpers.js";
import { CreateOTP } from "../social/src/helpers/helpers.js";
import { sendSMS } from "../utils/sendSMS.js";
import { AccountactivationEmail } from "../mails/AccountactivationEmail.js";

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password)
    return res.status(404).json({ message: "All fields are required" });

  // find login user by email
  const loginUser = await User.findOne({ email }).populate("role");

  // user not found
  if (!loginUser) return res.status(404).json({ message: "User not found" });

  // password check
  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  // password check
  if (!passwordCheck)
    return res.status(404).json({ message: "Wrong password" });

  // create access token
  const token = jwt.sign(
    { email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    }
  );

  // create Refresh token
  const refreshToken = jwt.sign(
    { email: loginUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    user: loginUser,
    message: "User Login Successful",
  });
});

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, auth, password } = req.body;

  if (!name || !auth || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // auth value manage
  let authEmail = null;
  let authPhone = null;

  //create a access token for account activation
  const activationCode = CreateOTP()

  if (isMobile(auth)) {
    authPhone = auth;

    //check mobiile exists or not
    const isMobileExists = await User.findOne({phone : auth})
    if (isMobileExists) {
      return res.status(400).json({
        message: "Phone Number Already Exit",
      });
    }

  // create access varification token
const Verifytoken = jwt.sign(
  { auth: auth },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: "15m",
  }
);

res.cookie("Verifytoken", Verifytoken);



  //otp sender sms
  await sendSMS(auth, `Hellow ${name}, Your Account Activation Code is : ${activationCode} `)


  } else if (isEmail(auth)) {
    authEmail = auth;

    //check Email exists or not
    const isEmailExists = await User.findOne({email : auth})
    if (isEmailExists) {
      return res.status(400).json({
        message: "Email Already Exit",
      });
    }

// create access varification token
const Verifytoken = jwt.sign(
  { auth: auth},
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: "15m",
  }
);

res.cookie("Verifytoken", Verifytoken);



    //activation link
    const activationLink = `http://localhost:3000/activation/${dotsToHyphens(Verifytoken)}`

    //send Activation Email
    await AccountactivationEmail(auth, {name, activationCode, link : activationLink})


  } else {
    return res.status(400).json({
      message: "Your must use mobile Number or Email address for registration",
    });
  }

  



  // password hash
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    email: authEmail,
    phone: authPhone,
    password: hashPass,
    accessToken : activationCode,
  });

  res.status(200).json({
    user,
    message: "User Created successful",
  });
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const makeHashPass = asyncHandler(async (req, res) => {
  const { password } = req.body;
  // password hash
  const hashPass = await bcrypt.hash(password, 10);
  res.status(200).json({ hashPass });
});


//accountAcctivatebyOTP
export const accountAcctivatebyOTP = asyncHandler(async(req, res) =>{
 const {token} =  req.params;
 const {otp} =  req.body;


 if (!token) {
  return res.status(400).json({message : "token not fount"})
 }

 if (!otp) {
  return res.status(400).json({message : "otp not found"})
 }

 const verifyToken = hyphensToDots(token)

 //verafy token
 const tokenCheck = jwt.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET);



 if (!tokenCheck) {
  return res.status(400).json({message : "invalid Activation request"})
 }

//activate account now
let activateUser = null

if (isMobile(tokenCheck.auth)) {
  activateUser = await User.findOne({ phone : tokenCheck.auth})

  if(!activateUser){
    return res.status(400).json({message : "Activate User Not Found"})
  }
}else if(isEmail(tokenCheck.auth)) {
  if(!activateUser){
    return res.status(400).json({message : "Activate User Not Found"})
  }
}else{
  return res.status(400).json({message : "Auth is Undefinde"})
}

// if(otp !== activateUser.accessToken){
//   return res.status(400).json({message : "Worang OTP"})
// }

activateUser.accessToken = null
activateUser.save()
return res.status(200).json({message : "User Activation Is Successfully"})

}) 









