import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

export const SetUp = () => {
  const [artists, setArtist] = useState<Array<string>>();
  const [page, setPage] = useState(0);
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
        let list = text.split("\n");
        let filteredList = list.filter(onlyUnique);
        let randomList = shuffleArray(filteredList as string[]);
        console.log(randomList);
        setArtist(randomList);
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

function onlyUnique(value : any, index: number, array: any[]) {
  return array.indexOf(value) === index;
}

function shuffleArray(array: string[]): string[] {
  // Create a copy of the original array to avoid modifying the original
  const shuffledArray = [...array];

  // Shuffle the array using the sort method with a random compare function
  shuffledArray.sort(() => Math.random() - 0.5);

  return shuffledArray;
}