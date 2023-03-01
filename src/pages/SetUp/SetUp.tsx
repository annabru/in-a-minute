import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

export const SetUp = () => {
  const [artists, setArtist] = useState<Array<string>>();
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const [skiped, setSkiped] = useState(0);

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
    <div>
      <Typography variant="h1">{artists ? artists[page] : "Loading"} </Typography>
      <Typography variant="h2">Score: {score} </Typography>
      <Typography variant="h3">Skiped: {skiped} </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          setPage(page + 1);
          setSkiped(skiped + 1);
        }}
      >
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
    </div>
  );
};
