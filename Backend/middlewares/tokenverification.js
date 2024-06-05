const { tokenemail} = require("../controllers/login");

async function tokenverification(req, res, next) {
  try {
    if (req.headers && req.headers.hasOwnProperty("token")) {

    const {tokentoemail,tokentouserId,tokentoauthor} = await tokenemail(req,res);
    if (tokentoemail === false) {
      // res.cookie("token", "", { expires: new Date() })
      res.status(401).json("no tokentoemail");
    } else {
      req.email=tokentoemail;
      req.userId = tokentouserId;
      req.author= tokentoauthor; 
      next()
    }
  } else {
    res.status(401).json("no token");
  }
  } catch (error) {
    console.log("tokenverification" , error);
  }
}

module.exports.tokenverification = tokenverification;
