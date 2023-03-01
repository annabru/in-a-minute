import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

export const SetUp = () => {
  const [artists, setArtist] = useState<Array<string>>();
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("people.txt", {
      headers: {
        Accept: "text/plain",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log(text);
        setArtist(text.split("\n"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          setPage(page + 1);
        } else if (e.key === "ArrowRight") {
          setPage(page + 1);
          setScore(score + 1);
        }
      }}
    >
      {/* <div style={divStyle}></div> */}
      <Typography variant="h1">{artists ? artists[page] : "Loading"} </Typography>
      <Typography variant="h2">Score: {score} </Typography>
      <Button variant="outlined" color="error" onClick={() => setPage(page + 1)}>
        Skip
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setScore(score + 1);
          setPage(page + 1);
        }}
      >
        Success!
      </Button>
      <Button onClick={() => setScore(0)}>Reset Score</Button>
    </Box>
  );
};
