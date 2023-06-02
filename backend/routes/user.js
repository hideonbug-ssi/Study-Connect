const express = require("express");
const router = express.Router();
const connection = require("../database");
const auth = require("../middleware/auth");

router.get("/:userId", auth, (req, res) => {
  try {
    const userId = req.user.userId; 
    console.log(userId);
    const sqlSelect = "SELECT * FROM users WHERE id = ?";
    connection.query(sqlSelect, [userId], (err, results) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        const userData = results[0];
        return res.json(userData);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.patch("/:userId", auth, (req, res) => {
  const userId = req.user.userId;
  const updates = req.body;
  console.log(userId);

  const sqlUpdate = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?";
  connection.query(
    sqlUpdate,
    [updates.firstname, updates.lastname, userId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        console.log(`User ${userId} updated successfully`);
        res.json({
          success: true,
          data: {
            id: userId,
            firstname: updates.firstname,
            lastname: updates.lastname,
          },
          error: null,
        });
      }
    }
  );
});

module.exports = router;