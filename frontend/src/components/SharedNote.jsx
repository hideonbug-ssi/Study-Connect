import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";

function SharedNote({note}) {
  return (
    <Card sx={{ backgroundColor: "#c5c6d0" }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {note.title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginTop: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {note.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SharedNote;
