const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "AxGX7aNmfJ";
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const connection = require("../database");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send({ data: "Here is your data" });
});
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, rows) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        numRows = rows.length;
        if (numRows == 0) {
          return res.json({
            success: false,
            message: "This account does not exist",
          });
        }
        const isMatch = await bcrypt.compare(password, rows[0].hashed_password);
        if (!isMatch) {
           return res.json({
            success: false,
            message: "the password is incorrect",
          });
        } else {
          const user = {
            id: rows[0].id,
            email: rows[0].email,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            is_admin: rows[0].is_admin,
          };
          const token = jwt.sign(
            { userId: rows[0].id, email: rows[0].email_address },
            secret,
            {
              expiresIn: "1d",
            }
          );
          res.cookie("user", token);
          res.json({
            success: true,
            message: "login success",
            user: user,
            token: token,
          });
        }
      }
    }
  );
});

router.post(
  "/register",
  check("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password ")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(
      "Password must be at least 8 characters, have at least 1 digit, uppercase, and lowercase"
    ),
  async (req, res) => {
    const firstName= req.body.firstName;
    const lastName = req.body.lastName;
    const email= req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
        success: false,
        message: "password format is not valid",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlInsert = `INSERT INTO users (first_name,last_name,email,hashed_password) VALUES (?,?,?,?)`;
    connection.query(
      sqlInsert,
      [firstName, lastName, email, hashedPassword],
      (err, results) => {
        if (err) {
          res.json({
            success: false,
            data: null,
            error: err.message,
          });
          return connection.rollback(() => {
            console.error("Error inserting row:", err.stack);
            throw err;
          });
        } else {
          if (results) {
            res.json({
                success: true,
                message: "register success",
                userId: results.insertId,
              });
          }
        }
      }
    );
  }
);

router.get("/checklogin", (req, res) => {
  const token = req.cookies.user;
  const decoded = jwt.verify(token, secret);
  if (decoded) {
    res.json({
      success: true,
      message:
        "User is logged in with ID: " +
        decoded.userId 
    });
  } else {
    res.json({
      success: false,
      message: "User is not logged in",
    });
  }
});

module.exports = router;