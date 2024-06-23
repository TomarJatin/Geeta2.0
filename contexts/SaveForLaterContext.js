import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
// import FormData from "form-data";

// Define the context
const SaveForLaterContext = createContext();

// Data Provider component
const SaveForLaterProvider = ({ children }) => {
  const [saveForLater, setSaveForLater] = useState([]);

  const getSaveForLater = async () => {
    const _saveForLater = await AsyncStorage.getItem("saveForLater");
    if(_saveForLater){
      setSaveForLater([...JSON.parse(_saveForLater)]);
    }
  };

  const setSaveForLaterStorage = async () => {
    AsyncStorage.setItem(
      "saveForLater",
      JSON.stringify(saveForLater),
      (err) => {
        if (err) {
          // console.log("an error");
          throw err;
        }
      }
    ).catch((err) => {
      // console.log("error is: " + err);
    });
  };

  // {
  //   verseId: 2,
  //   chapterId: 4,
  //   verse: ""
  // }

  return (
    <SaveForLaterContext.Provider
      value={{
        saveForLater,
        setSaveForLater,
        getSaveForLater,
        setSaveForLaterStorage,
      }}
    >
      {children}
    </SaveForLaterContext.Provider>
  );
};

export { SaveForLaterContext, SaveForLaterProvider };
