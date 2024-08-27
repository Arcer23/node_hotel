const jwt = require("jsonwebtoken");

const jwtAuthmiddeWare = (req, res, next) => {
  //Extracting the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decocoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decocoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

const ganeratetoken = (userData)=>{
    return jwt.sign(userData , process.env.JWT_SECRET)
}
module.exports = {jwtAuthmiddeWare,ganeratetoken};