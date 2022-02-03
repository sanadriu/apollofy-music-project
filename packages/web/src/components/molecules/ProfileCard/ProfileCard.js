import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProfileCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 150,
        minWidth: 130,
        margin: 1,
        padding: 1,
        width: "20%",
        display: "block",
        "&:hover": { opacity: "0.8" },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          src="https://images.pexels.com/photos/10931590/pexels-photo-10931590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="album image"
          sx={{ borderRadius: 1 }}
        />
        <CardContent>
          <Typography variant="body4" component="div">
            Titulo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            2022
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
