import { Button, Card, Pagination, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { load } from "cheerio";
import { Box } from "@mui/system";

export const SetUp = () => {
  const [artists, setArtist] = useState<Array<string>>();
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("/assets/people.txt")
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setArtist(text.split("\n"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   const searchQuery = "cute puppies"; // the search query to fetch the first image result for
  //   const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`;

  //   axios.get(searchUrl).then((response) => {
  //     const $ = load(response.data);

  //     const imageUrl = $("img").first().attr("src");

  //     if (imageUrl) {
  //       setImageUrl(imageUrl);
  //     }
  //   });
  // }, [artists, page]);

  // const divStyle = {
  //   backgroundImage: `url(${imageUrl})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   height: "200px",
  //   width: "200px",
  // };

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
