import { Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";

export const SetUp = () => {
  const [artists, setArtist] = useState<Array<string>>();
  const [page, setPage] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
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

  useEffect(() => {
    if(artists) {
      let artist = artists[page];
      getFirstGoogleImage(artist).then((res) => {
        if(res){
          setImgUrl(res);
        }
      });
    }
  }, [page, artists])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",

      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${imgUrl})` }}>
      <div style={{backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "24px"}}>

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


/**
 * Setup a custom search engine for this. https://programmablesearchengine.google.com/controlpanel/create/congrats?cx=f01c58fb3fc044959
 * Seems to work just fine, but have a limited number of search? Sometimes there is no image, don't know why, will maybe look into it in the future, 
 * but likely not.
 * @returns 
 */
async function getFirstGoogleImage(googleSearchTerm: string): Promise<string | null> {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        q: googleSearchTerm,
        searchType: 'image',
        key: 'AIzaSyBhIqO-Q5pdt8LfSczVBbDo4srj7Xc2wEk',
        cx: "f01c58fb3fc044959",
        num: 1  
      },
    });

    const firstImageLink = response.data.items?.[0]?.link;

    return firstImageLink || null;
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return null;
  }
}