const jwt = require("jsonwebtoken");
const { Users } = require("../models");

// JWT Authentication
const userAuthentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      res.status(401).json({
        message: "failed",
        result: null,
        error: "invalid token",
      });
      return;
    }

    req.user = await Users.findOne({
      where: {
        id: decoded.sub,
      },
    });

    next();
  } catch (error) {
    console.error(error);
  }
};
const adminAuthentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const checkRole = await Users.findOne({
      where: {
        id: decoded.sub
      }
    })

    if (checkRole.role != 'admin') {
      res.status(401).json({
        message: "failed",
        result: null,
        error: "only admin can access",
      });
      return;
    }

    if (!decoded) {
      res.status(401).json({
        message: "failed",
        result: null,
        error: "invalid token",
      });
      return;
    }

    req.user = await Users.findOne({
      where: {
        id: decoded.sub,
      },
    });

    next();
  } catch (error) {
    console.error(error);
  }
};

const sessionAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

module.exports = {
  userAuthentication,
  adminAuthentication,
  sessionAuthentication,
};
