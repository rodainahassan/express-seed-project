const express = require('express');
const errorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const authCtrl = require('../controllers/auth.controller');
const fileCtrl = require('../controllers/file.controller');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'Please login first to access our services',
      data: null,
    });
  }
  jwt.verify(token, req.app.get('secret'), (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null,
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

const isNotAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next();
  } else {
    res.status(403).json({
      error: null,
      msg: 'You are already logged in.',
      data: null,
    });
  }
};

// -------------------------------Auth------------------------------------------
router.post('/auth/signup', isNotAuthenticated, errorHandler(authCtrl.signup));
router.post('/auth/login', isNotAuthenticated, errorHandler(authCtrl.login));
router.patch(
  '/auth/verifyAccount/:verificationToken',
  errorHandler(authCtrl.verifyAccount),
);
router.patch(
  '/auth/forgotPassword',
  isNotAuthenticated,
  errorHandler(authCtrl.forgotPassword),
);
router.get(
  '/auth/checkResetPasswordToken/:resetPasswordToken',
  isNotAuthenticated,
  errorHandler(authCtrl.checkResetPasswordToken),
);
router.patch(
  '/auth/resetPassword/:userId/:resetPasswordToken',
  isNotAuthenticated,
  errorHandler(authCtrl.resetPassword),
);
router.patch(
  '/auth/changePassword',
  isAuthenticated,
  errorHandler(authCtrl.changePassword),
);

// -----------------------------------File-------------------------------------
router.get(
  '/file/:parentFolder/:subFolder/:fileName',
  isAuthenticated,
  fileCtrl.getFile,
);

module.exports = router;
