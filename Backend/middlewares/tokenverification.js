const { tokenemail } = require("../controllers/auth");

async function tokenverification(req, res, next) {
  try {
    if (
      (req.headers &&
        req.headers.hasOwnProperty("token") &&
        !req.headers.token) ||
      req.headers.token == "undefined"
    ) {
      return res.status(401).json({ message: "No token provided" });
    }
    const  authed = await tokenemail(
      req,
      res
    );
    if (!authed) {
      // res.cookie("token", "", { expires: new Date() })
      return res.status(401).json({ message: "Invalid token" });

    } 
      req.email =  authed.tokentoemail;
      req.userId = authed.tokentouserId;
      req.author = authed.tokentoauthor;
      next();
  } catch (error) {
    console.log("tokenverification", error);
  }
}

module.exports.tokenverification = tokenverification;
