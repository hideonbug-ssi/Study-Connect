const express = require("express");
const router = express.Router();
const connection = require("../database");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/notes/:userId", (req, res) => {
  console.log("get notes");
  try {
    const userId = req.params.userId;
    const sqlSelect = "SELECT * FROM my_notes WHERE user_id = ?";
    connection.query(sqlSelect, [userId], (err, results) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        const userData = results;
        return res.json(userData);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/notes", (req, res) => {
  console.log("get note");
  try {
    const noteId = req.query.noteId; // Access the noteId from the route parameter
    console.log(noteId);
    const sqlSelect = "SELECT * FROM my_notes WHERE id = ?";
    connection.query(sqlSelect, [noteId], (err, results) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
          message: "uhhhh",
        });
      } else {
        numRows = results.length;
        if (numRows == 0) {
          console.log("not found");
        } else {
          console.log(results);
          return res.json(results); // Return the results, not res
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/sharednotes", (req, res) => {
  console.log("shared notes");
  try {
    const userId = req.user.userId;
    const sqlSelect =
      "SELECT * FROM my_notes WHERE user_id <> ? ";
    const values = [userId, true];

    connection.query(sqlSelect, values, (err, results) => {
      if (err) {
        res.json({
          success: false,
          data: null,
          error: err.message,
        });
      } else {
        const sharednotes = results;
        return res.json(sharednotes);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/", (req, res) => {
  const userId = req.body.userId;
  const { title, content } = req.body;
  
  const sqlInsert =
    "INSERT INTO my_notes (title, content, user_id) VALUES (?, ?, ?)";
  const values = [title, content, userId];

  connection.query(sqlInsert, values, (err, results) => {
    if (err) {
      res.json({
        success: false,
        data: null,
        error: err.message,
      });
    } else {
      console.log("Note added");
      res.json({
        success: true,
        data: {
          title: title,
          content: content,
          user_id: userId,
        },
        error: null,
      });
    }
  });
});

router.patch("/notes", (req, res) => {
  const noteId = req.query.noteId;
  const update = req.body;
  // console.log(update);
  const sqlUpdate = "UPDATE my_notes SET title = ?, content = ? WHERE id = ?";
  connection.query(sqlUpdate, [update.title, update.content, noteId], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        success: false,
        data: null,
        error: err.message,

      });
    } else {
      console.log(`Note ${noteId} updated properly`);
      res.json({
        success: true,
        data: {
          id: noteId,
        },
        error: null,
      });
    }
  });
});

router.delete("/notes", (req, res) => {
  const noteId = req.query.noteId;
  const sqlDelete = "DELETE FROM my_notes WHERE id = ?";
  connection.query(sqlDelete, [noteId], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        success: false,
        data: null,
        error: err.message,
      });
    } else {
      console.log(`Note ${noteId} deleted properly`);
      res.json({
        success: true,
        error: null,
      });
    }
  });
})

module.exports = router;
