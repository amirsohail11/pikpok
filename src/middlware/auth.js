const jwt = require("jsonwebtoken");
const config = require("../config/db.config");

const generateJWT = (_id) => {
    const payload = {
        _id:_id,
    };  
    const options = {
        expiresIn: config.tokenExpirenIn,
    };  
    const token = jwt.sign(payload, config.secret, options);  
    return token;
};

const verifyJWT = (isReq = false) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    const result = token ? token.substr(token.indexOf(" ") + 1) : false;
    if (!result) {
      return res
        .status(403)
        .send({ status: false, code: 403, message: "Unauthorized !" });
    }
    jwt.verify(result, config.secret, async (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({
            status: false,
            code: 500,
            message: "Failed to authenticate token. !",
          });
      }
      const { _id } = decoded;
      if (isReq) {
        req.body.userId = _id;
      }
      next();
      return null;
    });
    return null
  };
};

module.exports = {verifyJWT, generateJWT};
