import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// IMPORT CONTEXTS
import ColorContext from "../contexts/ColorContext";

// IMPORT UTILITIES
import {axiosWithAuth} from "../utilities/axiosWithAuth";

// IMPORT APP COMPONENTS
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {

  const { colorList, setColorList }   = useContext(ColorContext);

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(response => {
        console.log("Data is here: ", response.data);
        setColorList(response.data);
      })
      .catch(error => {
        console.log("That's an ERROR! ", error);
      })
  }, []);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
