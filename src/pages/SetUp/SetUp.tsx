import React, { useEffect } from "react";

export const SetUp = () => {
  useEffect(() => {
    fetch("/assets/people.txt")
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <div>My component</div>;
};
