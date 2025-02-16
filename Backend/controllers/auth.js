const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { loginModel } = require("../models/loginschema");
/*  
signup takes :-
  password
  confirmpassword
  companyname
*/
function CheckNotEmpty(obj, keyss = []) {
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length === 0
  ) {
    return false;
  }

  // Check for specific keys if `keyss` array is provided
  if (keyss.length > 0) {
    for (let key of keyss) {
      if (
        !obj.hasOwnProperty(key) ||
        !obj[key] ||
        obj[key].toString().trim() === ""
      ) {
        return false;
      }
    }
  }

  // Check all keys in `obj` if `keyss` is empty
  for (let key in obj) {
    if (
      !obj[key] ||
      obj[key].toString().trim() === "" ||
      obj[key] === undefined ||
      obj[key] === null ||
      obj[key] === "undefined" ||
      obj[key] === "null"
    ) {
      return false;
    }
  }

  return true;
}

module.exports.signup = async function (req, res) {
  try {
    // Check if request body is not empty
    if (
      !CheckNotEmpty(req.body, ["user", "email", "password", "confirmpassword"])
    ) {
      return res.status(200).json({ message: "Field is missing", okk: false });
    }

    // Password confirmation check
    if (req.body.password !== req.body.confirmpassword) {
      return res
        .status(200)
        .json({ message: "Password does not match", okk: false });
    }

    // Check if email or user already exists
    const check = await loginModel.findOne({
      $or: [{ email: req.body.email.toLowerCase() }, { user: req.body.user }],
    });

    if (check) {
      return res
        .status(200)
        .json({ message: "Email or username already exists", okk: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.PASSWORD_KEY)
    );
    // Create new user
    await loginModel.create({
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      user: req.body.user,
    });

    res.status(201).json({ message: "Signed up successfully", okk: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", okk: false });
  }
};

module.exports.login = async (req, res) => {
  try {
    // Check if the request body has required fields
    if (!CheckNotEmpty(req.body, ["email", "password"])) {
      return res
        .status(200)
        .json({ message: "Fields are missing", okk: false });
    }

    // Find user by email
    const check = await loginModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!check) {
      return res.status(200).json({ message: "Email not found", okk: false });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ message: "Email or password is incorrect", okk: false });
    }

    // Generate a token upon successful login
    const token = jwt.sign({ di: check._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set token as an HTTP-only cookie
    res.cookie("token", token, { maxAge: 3600000, httpOnly: true }); // Token expires in 1 hour

    // Respond with a success message and token
    return res.status(200).json({
      token: token,
      email: req.body.email.toLowerCase(),
      okk: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", okk: false });
  }
};

module.exports.email = async (req, res) => {
  try {
    // Check if the token is present and not empty in headers
    const token = req.headers.token;
    if (!token || !CheckNotEmpty({ token: token })) {
      return res.status(200).json({ message: "No token provided", okk: false });
    }

    // Verify and decode the token
    const { di } = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch the user details, excluding _id, password, and __v fields
    const result = await loginModel.findOne(
      { _id: di },
      { email: 1 } // Only project the email field
    );

    if (!result) {
      return res.status(200).json({ message: "Email not found", okk: false });
    }

    // Respond with the user's email
    return res.status(200).json({ email: result.email, okk: true });
  } catch (error) {
    console.error(error);

    // Handle invalid token specifically
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token", okk: false });
    }

    return res.status(500).json({ message: "Server error", okk: false });
  }
};

module.exports.signout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date() }).json(`sign outed`);
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "error", okk: false });
  }
};

//token = req.cookies.token
module.exports.tokenemail = async (req, res) => {
  try {
    if (
      req.headers.hasOwnProperty("token") 
      &&
      CheckNotEmpty({token:req.headers.token})
    ) {
      const valid = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      const result = await loginModel.findOne({ _id: valid.di });
      if (result) {
        return {
          tokentoemail: result.email,
          tokentouserId: valid.email,
          tokentoauthor: result.user,
        };
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error", okk: false });
  }
};
